import { getFunctions, httpsCallable } from 'firebase/functions'

export const getProducts = async () => {
  const functions = getFunctions()
  const getProducts = httpsCallable(functions, 'getProducts')

  try {
    const res = await getProducts()
    const products = res.data
    return products
  } catch (error) {
    //console.log('code', error.code, 'msg', error.message)
    throw new Error(error.message)
  }
}

export const getProduct = async (id) => {
  const functions = getFunctions()
  const getProductFunction = httpsCallable(functions, 'getProduct')

  try {
    const res = await getProductFunction({ data: { id } })
    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const saveProduct = async () => {
  const functions = getFunctions()
  const addProduct = httpsCallable(functions, 'addProduct')

  const productData = {
    name: 'second product',
    description: 'Second Description',
  }
  try {
    const result = await addProduct({
      data: productData,
    })
    const data = result.data
    console.log(data)
  } catch (error) {
    console.log(
      'code',
      error.code,
      ' | message',
      error.message,
      '| details',
      error.details
    )
  }
}
