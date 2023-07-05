import { atom } from 'nanostores'
import type { ProductT } from '../firebase/utility/firestore'

type CartItemT = ProductT & { quantity: number }

export const $cart = atom<CartItemT[]>(getCartFromLS())

export const addToCart = (product: CartItemT) =>
  $cart.set([...$cart.get(), product])

export const getCartItems = $cart.get()

// Local Storage
// Update LS on $cart change
$cart.listen((cart) => localStorage.setItem('cart', JSON.stringify(cart)))

export function getCartFromLS(): CartItemT[] {
  const data = localStorage.getItem('cart')
  if (!data) return []
  return JSON.parse(data)
}

function clearLS() {
  localStorage.removeItem('cart')
}
