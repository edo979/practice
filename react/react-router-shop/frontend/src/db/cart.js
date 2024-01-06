import { getFunctions, httpsCallable } from 'firebase/functions'

export const addCartItem = async (data) => {
  const functions = getFunctions()
  const addCartItemFunction = httpsCallable(functions, 'addCartItem')

  return await addCartItemFunction(data)
}
