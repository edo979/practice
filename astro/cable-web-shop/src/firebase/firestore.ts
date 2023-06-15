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

export const isProductNameExist = async (name: string) => {
  try {
    const snapshot = await productsRef.where('name', '==', name).get()
    if (snapshot.empty) {
      return false
    }
    return true
  } catch (error) {
    throw new Error('Erros just hapen on database!')
  }
}

export const saveProduct = async (data: RawProductT) => {
  try {
    await productsRef.doc().set(data)
    return true
  } catch (error) {
    throw new Error('Erros just hapen on database!')
  }
}
