import { atom, computed } from 'nanostores'

export type CartItemT = {
  productId: string
  quantity: number
}

export const $cart = atom<CartItemT[]>([])
export const $cartItemsTotal = computed($cart, (products) =>
  products.reduce((prev, current) => prev + current.quantity, 0)
)
