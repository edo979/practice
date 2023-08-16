// firebase-config.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDrS5stc6S7GFAIKuIjnFPxT_x0HbqMJ3g',
  authDomain: 'pwagram-practice.firebaseapp.com',
  projectId: 'pwagram-practice',
  storageBucket: 'pwagram-practice.appspot.com',
  messagingSenderId: '304205125594',
  appId: '1:304205125594:web:12490234f1de83c6d452e3',
}

const firebaseApp = initializeApp(firebaseConfig)

// Use Firestore Emulator
if (process.env.NODE_ENV === 'development') {
  const firestore = getFirestore()
  firestore.useEmulator('localhost', 8080)
}

export { firebaseApp }
