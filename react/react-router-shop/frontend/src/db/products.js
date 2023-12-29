import { getFunctions, httpsCallable } from 'firebase/functions'

export const getProducts = async () => {
  const functions = getFunctions()
  const getProductsFunction = httpsCallable(functions, 'getProducts')

  try {
    const res = await getProductsFunction()
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

export const addProduct = async () => {
  const functions = getFunctions()
  const addProductFunction = httpsCallable(functions, 'addProduct')

  const productData = {
    name: 'second product',
    description: 'Second Description',
  }
  try {
    const result = await addProductFunction({
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
