import { Timestamp, getFirestore } from 'firebase-admin/firestore'

export type RawProductT = {
  name: string
  price: string
  desc: string
}
export type ProductT = RawProductT & {
  id: string
  created_at: Date
  imageUrl: string
}

export const productsRef = getFirestore().collection('products')
