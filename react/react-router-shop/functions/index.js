const admin = require('firebase-admin')
const functions = require('firebase-functions')
const PRODUCTS = 'products'

admin.initializeApp()

exports.addProduct = functions.https.onCall(async (req) => {
  const db = admin.firestore()
  try {
    await db.collection(PRODUCTS).add({
      name: req.data.name,
      description: req.data.description,
    })
    return { message: 'Product added successfully!' }
  } catch (error) {
    console.log(error)
    throw new functions.https.HttpsError('internal', 'Error getting products')
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
