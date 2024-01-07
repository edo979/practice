const path = require('path')
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const { logger } = require('firebase-functions/v2')
const { getStorage, getDownloadURL } = require('firebase-admin/storage')
const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { onObjectFinalized } = require('firebase-functions/v2/storage')
const { validateProductData } = require('./utilities/validator')
const sharp = require('sharp')

// Firestore collection name
const PRODUCTS = 'products'
const STORAGE_COLLECTION = 'proShop'

admin.initializeApp() // TODO: add user authorization

// PRODUCTS
exports.addProduct = onCall(async (req) => {
  const db = admin.firestore()
  const { errors, productData } = validateProductData(req)

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

exports.editProduct = onCall(async (req) => {
  const db = admin.firestore()
  const { productData, errors } = validateProductData(req)

  if (Object.values(errors).some(Boolean))
    throw new HttpsError('invalid-argument', 'Form submitted wrong', errors)

  try {
    const res = await db
      .collection(PRODUCTS)
      .doc(req.data.id)
      .update(productData)
    return { message: 'Product updated!' }
  } catch (error) {
    throw new HttpsError('internal', 'Server Error!')
  }
})

exports.deleteProduct = onCall(async (req) => {
  const db = admin.firestore()

  try {
    db.collection(PRODUCTS).doc(req.data.id).delete()
    return { message: 'Product deleted!' }
  } catch (error) {
    throw new HttpsError('not-found', 'Resource can not be found!')
  }
})

// CART ITEMS
exports.addCartItem = onCall(async (req) => {
  const db = admin.firestore()
  const uid = req.auth.uid
  // TODO: validate user
  const productId = req.data.productId
  const quantity = req.data.quantity

  try {
    await db.collection(`users/${uid}/cart`).add({ productId, quantity })
  } catch (error) {
    console.log(error)
  }
})

exports.getCartItems = onCall(async (req) => {
  const db = admin.firestore()
  const uid = req.auth.uid

  try {
    const snapshot = await db.collection(`users/${uid}/cart`).get()
    if (snapshot.empty) throw new HttpsError('not-found', 'Cart is empty!')

    const cartItems = snapshot.docs.map((doc) => doc.data())
    const productRefs = cartItems.map((item) =>
      db.collection(PRODUCTS).doc(item.productId)
    )
    const productSnapshots = await db.getAll(...productRefs)

    const products = productSnapshots.map((docSnapshot) => {
      if (docSnapshot.exists) {
        const id = docSnapshot.id
        const quantity =
          cartItems.find((item) => item.productId === id).quantity ?? 0

        return { ...docSnapshot.data(), id, quantity }
      }
    })

    return products
  } catch (error) {
    //console.log(error)
    throw new HttpsError('internal', 'Server error!')
  }
})

exports.delCartItem = onCall(async (req) => {
  const db = admin.firestore()
  const uid = req.auth.uid
  const productId = req.data.productId
})

// Triggers
exports.generateThumbnailAndLinks = onObjectFinalized(
  { cpu: 2 },
  async (event) => {
    const fileBucket = event.data.bucket
    const filePath = event.data.name
    const contentType = event.data.contentType
    const fileName = path.basename(filePath)

    if (!contentType.startsWith('image/')) return null
    if (fileName.startsWith('thumb_')) return null

    const bucket = getStorage().bucket(fileBucket)
    const imageRef = bucket.file(filePath)
    const downloadResponse = await imageRef.download()
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
    const thumbRef = bucket.file(`${STORAGE_COLLECTION}/${thumbFileName}`)
    await thumbRef.save(thumbnailBuffer, {
      metadata: metadata,
    })

    logger.log('Thumbnail uploaded!')

    // save link of image and thumbnail to firestore
    try {
      // fileName is the id of product set when image saved to storage
      const productRef = admin
        .firestore()
        .collection(PRODUCTS)
        .doc(path.parse(fileName).name)

      await productRef.update({
        thumb: await getDownloadURL(thumbRef),
        image: await getDownloadURL(imageRef),
      })
      return logger.log('Thumbnail and image link saved to firestore!')
    } catch (error) {
      throw new HttpsError('aborted', 'Error saving thumbnail link to db!')
    }
  }
)
