const admin = require('firebase-admin')
const { getStorage } = require('firebase-admin/storage')
const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { onObjectFinalized } = require('firebase-functions/v2/storage')
const { logger } = require('firebase-functions/v2')
const sharp = require('sharp')
const path = require('path')
const { validateString, validateNumber } = require('./utilities/validator')

// Firestore collection name
const PRODUCTS = 'products'

admin.initializeApp()

exports.addProduct = onCall(async (req) => {
  const db = admin.firestore()
  const errors = {}
  const productData = {
    name: req.data.name.trim(),
    brand: req.data.brand.trim(),
    category: req.data.category.trim(),
    description: req.data.description.trim(),
    inStock: req.data.inStock,
    price: req.data.price,
  }

  // // throw new HttpsError('internal', 'Server Error!')
  // // Validation

  errors.name = validateString(productData.name, 5)
  errors.brand = validateString(productData.brand, 3)
  errors.category = validateString(productData.category, 3)
  errors.description = validateString(productData.description, 10, 150)
  errors.inStock = validateNumber(productData.inStock)
  errors.price = validateNumber(productData.price, 'float')

  if (Object.values(errors).some(Boolean))
    throw new HttpsError('invalid-argument', 'Form submitted wrong', errors)

  //Saving to DB
  try {
    const product = await db.collection(PRODUCTS).add(productData)

    return { id: product.id }
  } catch (error) {
    throw new HttpsError('internal', 'Server Error!')
  }
})

exports.getProducts = onCall(async (req) => {
  const db = admin.firestore()

  try {
    const snapshot = await db.collection(PRODUCTS).get()
    if (snapshot.empty) throw new HttpsError('not-found', 'No products!')

    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  } catch (error) {
    throw new HttpsError('internal', 'Server error!')
  }
})

exports.getProduct = onCall(async (req) => {
  const db = admin.firestore()

  try {
    const doc = await db.collection(PRODUCTS).doc(req.data.id).get()

    if (!doc.exists)
      throw new HttpsError('not-found', 'Requested document not found!')

    return { id: doc.id, ...doc.data() }
  } catch (error) {
    throw new HttpsError('internal', 'Server Error!')
  }
})

// triggers
exports.generateThumbnail = onObjectFinalized({ cpu: 2 }, async (event) => {
  const fileBucket = event.data.bucket
  const filePath = event.data.name
  const contentType = event.data.contentType

  if (!contentType.startsWith('image/')) {
    return logger.log('This is not an image.')
  }

  const fileName = path.basename(filePath)
  if (fileName.startsWith('thumb_')) {
    return logger.log('Already a Thumbnail.')
  }

  const bucket = getStorage().bucket(fileBucket)
  const downloadResponse = await bucket.file(filePath).download()
  const imageBuffer = downloadResponse[0]

  const thumbnailBuffer = await sharp(imageBuffer)
    .resize({
      width: 200,
      height: 200,
      withoutEnlargement: true,
    })
    .toBuffer()

  const thumbFileName = `thumb_${fileName}`

  const metadata = { contentType: contentType }
  await bucket.file(`proShop/${thumbFileName}`).save(thumbnailBuffer, {
    metadata: metadata,
  })

  return logger.log('Thumbnail uploaded!')
})
