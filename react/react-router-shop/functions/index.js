const admin = require('firebase-admin')
const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { logger } = require('firebase-functions/v2')
const { validateString, validateNumber } = require('./utilities/validator')
// Firestore collection name
const PRODUCTS = 'products'

admin.initializeApp()

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
