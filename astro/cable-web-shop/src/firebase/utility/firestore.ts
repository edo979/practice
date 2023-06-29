import { getFirestore } from 'firebase-admin/firestore'

export type ProductT = {
  id: string
  created_at: Date
  name: string
  price: number
  desc: string
  imageUrl: string
}

export const productsRef = getFirestore().collection('products')
