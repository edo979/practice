import { getFunctions, httpsCallable } from 'firebase/functions'

export const createOrder = async (data) => {
  const functions = getFunctions()
  const createOrderFunction = httpsCallable(functions, 'createOrder')

  return await createOrderFunction(data)
}

export const getOrders = async () => {
  const functions = getFunctions()
  const getOrdersFunction = httpsCallable(functions, 'getOrders')
  return await getOrdersFunction()
}

export const getOrder = async (id) => {
  const functions = getFunctions()
  const getOrderFunction = httpsCallable(functions, 'getOrder')

  return await getOrderFunction({ id })
}

export const payOrder = async (data) => {
  const functions = getFunctions()
  const payOrderFunction = httpsCallable(functions, 'payOrder')

  return await payOrderFunction(data)
}
