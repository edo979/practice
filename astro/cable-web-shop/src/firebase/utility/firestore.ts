import { Timestamp, getFirestore } from 'firebase-admin/firestore'

export type RawProductT = {
  name: string
  price: string
  desc: string
}
export type ProductT = RawProductT & {
  id: string
  created_at: Timestamp
  imageUrl: string
}

export const productsRef = getFirestore().collection('products')
