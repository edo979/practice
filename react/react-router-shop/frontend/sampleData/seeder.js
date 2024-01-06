import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  writeBatch,
} from 'firebase/firestore'
import { productsSampleData } from './data.js'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  projectId: 'demo-app',
  apiKey: 'any',
  authDomain: 'any',
  storageBucket: 'gs://demo-app.appspot.com/',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)

const collectionName = 'products'
const batch = writeBatch(db)

const seedData = async () => {
  productsSampleData.forEach((product) => {
    const prodRef = doc(collection(db, collectionName))
    batch.set(prodRef, product)
  })

  await batch.commit()
  process.exit()
}

seedData()
