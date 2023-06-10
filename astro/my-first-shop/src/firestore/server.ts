import { Firestore } from '@google-cloud/firestore'

export const db = new Firestore({
  projectId: 'my-shop-practice-cd1af',
  keyFilename: './secrets/my-shop-practice-cd1af-80b0e554a9e9.json',
})
