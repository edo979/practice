const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp()

exports.addProduct = functions.https.onCall(async (req) => {
  const db = admin.firestore()
  try {
    await db.collection('products').add({
      name: req.data.name,
      description: req.data.description,
    })
    return { message: 'Product added successfully!' }
  } catch (error) {
    console.log(error)
    throw new functions.https.HttpsError(
      'internal',
      'Error getting products',
      'Details'
    )
  }
})
