import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore'

type RawProductT = {
  name: string
  price: string
}

type ProductT = RawProductT & { id: string; created_at: Timestamp }

const productsRef = getFirestore().collection('products')

export const getProductsOrderedByTime = async () =>
  (await productsRef.orderBy('created_at', 'desc').limit(5).get()).docs.map(
    (doc) => ({
      name: doc.data().name,
      price: doc.data().price,
      created_at: doc.data().created_at,
    })
  ) as ProductT[]

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
    await productsRef
      .doc()
      .set({ ...data, created_at: FieldValue.serverTimestamp() })
    return true
  } catch (error) {
    throw new Error('Erros just hapen on database!')
  }
}
