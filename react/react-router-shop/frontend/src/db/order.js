import { getFunctions, httpsCallable } from 'firebase/functions'

export const createOrder = async (data) => {
  const functions = getFunctions()
  const createOrder = httpsCallable(functions, 'createOrder')

  return await createOrder(data)
}

export const getOrder = async (id) => {
  const functions = getFunctions()
  const getOrder = httpsCallable(functions, 'getOrder')

  return await getOrder({ id })
}
