import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore'

export type RawProductT = {
  name: string
  price: string
}
export type ProductT = RawProductT & { id: string; created_at: Timestamp }

export const productsRef = getFirestore().collection('products')
