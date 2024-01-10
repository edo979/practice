import { getFunctions, httpsCallable } from 'firebase/functions'

export const createOrder = async (data) => {
  const functions = getFunctions()
  const createOrder = httpsCallable(functions, 'createOrder')

  return await createOrder(data)
}
