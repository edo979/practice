const { initializeApp } = require('firebase-admin/app')
const { getStorage } = require('firebase-admin/storage')
const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { onObjectFinalized } = require('firebase-functions/v2/storage')
const { logger } = require('firebase-functions/v2')
const sharp = require('sharp')
const path = require('path')
const { validateString, validateNumber } = require('./utilities/validator')

// Firestore collection name
const PRODUCTS = 'products'

initializeApp()

exports.addProduct = onCall(async (request) => {
  const db = admin.firestore()
  const errors = {}
  // const productData = {
  //   name: req.data.name.trim(),
  //   brand: req.data.brand.trim(),
  //   category: req.data.category.trim(),
  //   description: req.data.description.trim(),
  //   inStock: req.data.inStock,
  //   price: req.data.price,
  // }

  console.log(request.data)

  // console.log(data.file)
  // console.log(data.file.name)

  //throw new HttpsError('internal', 'Server Error!')
  // Validation

  // errors.name = validateString(productData.name, 5)
  // errors.brand = validateString(productData.brand, 3)
  // errors.category = validateString(productData.category, 3)
  // errors.description = validateString(productData.description, 10, 150)
  // errors.inStock = validateNumber(productData.inStock)
  // errors.price = validateNumber(productData.price, 'float')

  // if (Object.values(errors).some(Boolean))
  //   throw new HttpsError(
  //     'invalid-argument',
  //     'Form submitted wrong',
  //     errors
  //   )

  // //Saving to DB
  // try {
  //   await db.collection(PRODUCTS).add(productData)
  //   return { message: 'Product added successfully!' }
  // } catch (error) {
  //   throw new HttpsError('internal', 'Server Error!')
  // }
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
  const fileBucket = event.data.bucket // Storage bucket containing the file.
  const filePath = event.data.name // File path in the bucket.
  const contentType = event.data.contentType // File content type.

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    return logger.log('This is not an image.')
  }
  // Exit if the image is already a thumbnail.
  const fileName = path.basename(filePath)
  if (fileName.startsWith('thumb_')) {
    return logger.log('Already a Thumbnail.')
  }

  // Download file into memory from bucket.
  const bucket = getStorage().bucket(fileBucket)
  const downloadResponse = await bucket.file(filePath).download()
  const imageBuffer = downloadResponse[0]
  logger.log('Image downloaded!')

  // Generate a thumbnail using sharp.
  const thumbnailBuffer = await sharp(imageBuffer)
    .resize({
      width: 200,
      height: 200,
      withoutEnlargement: true,
    })
    .toBuffer()
  logger.log('Thumbnail created')

  // Prefix 'thumb_' to file name.
  const thumbFileName = `thumb_${fileName}`
  //const thumbFilePath = path.join(path.dirname(filePath), thumbFileName)

  // Upload the thumbnail.
  const metadata = { contentType: contentType }
  await bucket.file(`proShop/${thumbFileName}`).save(thumbnailBuffer, {
    metadata: metadata,
  })
  return logger.log('Thumbnail uploaded!')
})
