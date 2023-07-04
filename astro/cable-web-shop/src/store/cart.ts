import { atom } from 'nanostores'
import type { ProductT } from '../firebase/utility/firestore'

export const $cart = atom<ProductT[]>([])
export const addToCart = (product: ProductT) =>
  $cart.set([...$cart.get(), product])
export const getCartItems = $cart.get()
