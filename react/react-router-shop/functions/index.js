const admin = require('firebase-admin')
const functions = require('firebase-functions')
const { validateString, validateNumber } = require('./utilities/validator')
const PRODUCTS = 'products'

admin.initializeApp()

exports.addProduct = functions.https.onCall(async (req) => {
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

  //throw new functions.https.HttpsError('internal', 'Server Error!')
  // Validation

  errors.name = validateString(productData.name, 5)
  errors.brand = validateString(productData.brand, 3)
  errors.category = validateString(productData.category, 3)
  errors.description = validateString(productData.description, 10, 150)
  errors.inStock = validateNumber(productData.inStock)
  errors.price = validateNumber(productData.price, 'float')

  if (Object.values(errors).some(Boolean))
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Form submitted wrong',
      errors
    )

  //Saving to DB
  try {
    await db.collection(PRODUCTS).add(productData)
    return { message: 'Product added successfully!' }
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Server Error!')
  }
})

exports.getProducts = functions.https.onCall(async (req) => {
  const db = admin.firestore()

  try {
    const snapshot = await db.collection(PRODUCTS).get()
    if (snapshot.empty)
      throw new functions.https.HttpsError('not-found', 'No products!')

    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Server error!')
  }
})

exports.getProduct = functions.https.onCall(async (req) => {
  const db = admin.firestore()

  try {
    const doc = await db.collection(PRODUCTS).doc(req.data.id).get()

    if (!doc.exists)
      throw new functions.https.HttpsError(
        'not-found',
        'Requested document not found!'
      )

    return { id: doc.id, ...doc.data() }
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Server Error!')
  }
})
