import { getFirestore } from 'firebase-admin/firestore'
type RawProductT = {
  name: string
  price: string
}

type ProductT = RawProductT & { id: string }

const productsRef = getFirestore().collection('products')

export const getProducts = async () =>
  (await productsRef.get()).docs.map((doc) => ({
    name: doc.data().name,
    price: doc.data().price,
  })) as ProductT[]

export const saveProduct = async (data: RawProductT) => {
  productsRef.doc().set(data)
}
