import { db } from '../src/db/init.js'
import { addDoc, collection } from 'firebase/firestore'

import { productsSampleData } from './data.js'

const collectionName = 'products'

const seedData = async () => {
  productsSampleData.map(async (product) => {
    await addDoc(collection(db, collectionName), product)
  })
}

seedData()
