import { atom } from 'nanostores'

type CartItemT = {
  productId: string
  quantity: number
}

export const $cart = atom<CartItemT[]>([])
