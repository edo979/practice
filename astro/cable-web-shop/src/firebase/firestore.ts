import { getFirestore } from 'firebase-admin/firestore'

const productsRef = getFirestore().collection('products')

export const getProducts = async () => (await productsRef.get()).docs
