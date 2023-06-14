import { getFirestore } from 'firebase-admin/firestore'

const productsRef = getFirestore().collection('products')

export const getProducts = async () =>
  (await productsRef.get()).docs.map((doc) => ({
    name: doc.data().name,
    price: doc.data().price,
  })) as { name: string; price: number }[]
