import { atom } from 'nanostores'
import type { ProductT } from '../firebase/utility/firestore'

type CartItemT = ProductT & { quantity: number }

export const $cart = atom<CartItemT[]>(getCartFromLS())

export const addToCart = (newItem: CartItemT) => {
  const isInCart = $cart.get().find((item) => item.id === newItem.id)

  if (isInCart) {
    $cart.set(
      $cart.get().map((item) => {
        if (item.id === newItem.id)
          return { ...item, quantity: newItem.quantity }
        return item
      })
    )
  } else {
    $cart.set([...$cart.get(), newItem])
  }
}

export const getCartItems = $cart.get()

// Local Storage
// Update LS on $cart change
$cart.listen((cart) => localStorage.setItem('cart', JSON.stringify(cart)))

export function getCartFromLS(): CartItemT[] {
  const data = localStorage.getItem('cart')
  if (!data) return []
  return JSON.parse(data)
}
