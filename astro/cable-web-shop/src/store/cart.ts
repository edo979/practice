import { atom, computed } from 'nanostores'
import type { ProductT } from '../firebase/utility/firestore'

type CartItemT = ProductT & { quantity: number }

export const $cart = atom<CartItemT[]>(getCartFromLS())
export const $cartTotalPrice = computed($cart, (cart) => {
  return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
})
export const $totalCartItems = computed($cart, (cart) =>
  $cart.get().reduce((acc, curr) => acc + curr.quantity, 0)
)

export const addToCart = (newItem: CartItemT) => {
  const isInCart = $cart.get().find((item) => item.id === newItem.id)

  if (isInCart) {
    let newCart: CartItemT[] = []

    if (newItem.quantity === 0) {
      // remove if quantity = 0
      newCart = $cart.get().filter((item) => item.id !== newItem.id)
    } else {
      // update quantity
      newCart = $cart.get().map((item) => {
        if (item.id === newItem.id)
          return { ...item, quantity: newItem.quantity }
        return item
      })
    }

    $cart.set(newCart)
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
