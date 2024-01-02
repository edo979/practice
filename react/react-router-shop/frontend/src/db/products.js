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
    const res = await getProductFunction({ id })
    return res.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const addProduct = async (data) => {
  const functions = getFunctions()
  const addProductFunction = httpsCallable(functions, 'addProduct')

  return await addProductFunction(data)
}

export const editProduct = async (data) => {
  const functions = getFunctions()
  const editProductFunction = httpsCallable(functions, 'editProduct')

  return await editProductFunction(data)
}
