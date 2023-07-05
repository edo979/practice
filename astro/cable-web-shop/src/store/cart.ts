import { atom } from 'nanostores'
import type { ProductT } from '../firebase/utility/firestore'

export const $cart = atom<ProductT[]>([])

export const addToCart = (product: ProductT) =>
  $cart.set([...$cart.get(), product])

export const getCartItems = $cart.get()

// Local Storage
// Update LS on $cart change
$cart.listen((cart) => localStorage.setItem('cart', JSON.stringify(cart)))

export function getCartFromLS() {
  const data = localStorage.getItem('cart')
  if (!data) return null
  return JSON.parse(data) as ProductT
}

function clearLS() {
  localStorage.removeItem('cart')
}
