import { getFunctions, httpsCallable } from 'firebase/functions'

export const getOrders = async () => {
  const functions = getFunctions()
  const getOrdersFunction = httpsCallable(functions, 'getOrdersAdmin')

  return await getOrdersFunction()
}
