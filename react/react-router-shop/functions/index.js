const admin = require('firebase-admin')
const functions = require('firebase-functions')
const { validateString } = require('./utilities/validator')
const PRODUCTS = 'products'

admin.initializeApp()

exports.addProduct = functions.https.onCall(async (req) => {
  const db = admin.firestore()
  const errors = {}
  //throw new functions.https.HttpsError('internal', 'Server Error!')
  // Validation
  errors.name = validateString(req.data.name, 5)
  errors.brand = validateString(req.data.brand, 3)
  errors.category = validateString(req.data.category, 3)
  errors.description = validateString(req.data.description, 10, 150)
  errors.inStock = typeof req.data.inStock === 'number' ? null : 'Wrong data!'
  errors.price = typeof req.data.price === 'number' ? null : 'Wrong data!'

  if (Object.values(errors).some(Boolean))
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Form submitted wrong',
      errors
    )

  // Saving to DB
  // try {
  //   await db.collection(PRODUCTS).add({
  //     name: req.data.name,
  //     description: req.data.description,
  //   })
  //   return { message: 'Product added successfully!' }
  // } catch (error) {
  //   throw new functions.https.HttpsError(
  //     'internal',
  //     'Server Error!'
  //   )
  // }
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
