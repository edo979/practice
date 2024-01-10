import { getFunctions, httpsCallable } from 'firebase/functions'

export const createOrder = async (data) => {
  const functions = getFunctions()
  const createOrderFunction = httpsCallable(functions, 'createOrder')

  return await createOrderFunction(data)
}

export const getOrder = async (id) => {
  const functions = getFunctions()
  const getOrderFunction = httpsCallable(functions, 'getOrder')

  return await getOrderFunction({ id })
}
