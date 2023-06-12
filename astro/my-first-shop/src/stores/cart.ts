import { atom, computed } from 'nanostores'
import type { ProductT } from '../pages/products/index.astro'

export type CartItemT = ProductT & { quantity: number }

export const $cart = atom<CartItemT[]>([
  {
    name: 'test cable test cable test cable test cable',
    id: '222',
    imageUrl:
      'https://storage.googleapis.com/my-shop-app-storage/1686486321445_hdmi.jpg',
    price: 12.55,
    quantity: 4,
  },
  {
    name: 'test cable test cable test cable test cable',
    id: '222',
    imageUrl:
      'https://storage.googleapis.com/my-shop-app-storage/1686486321445_hdmi.jpg',
    price: 12.55,
    quantity: 4,
  },
  {
    name: 'test cable test cable test cable test cable',
    id: '222',
    imageUrl:
      'https://storage.googleapis.com/my-shop-app-storage/1686486321445_hdmi.jpg',
    price: 12.55,
    quantity: 4,
  },
  {
    name: 'test cable test cable test cable test cable',
    id: '222',
    imageUrl:
      'https://storage.googleapis.com/my-shop-app-storage/1686486321445_hdmi.jpg',
    price: 12.55,
    quantity: 4,
  },
  {
    name: 'test cable test cable test cable test cable',
    id: '222',
    imageUrl:
      'https://storage.googleapis.com/my-shop-app-storage/1686486321445_hdmi.jpg',
    price: 12.55,
    quantity: 4,
  },
])
export const $cartItemsTotal = computed($cart, (products) =>
  products.reduce((prev, current) => prev + current.quantity, 0)
)

export const addProductInCartHandler = (product: ProductT, quantity = 0) => {
  const isProductInCart = $cart
    .get()
    .find((cartItem) => cartItem.id === product.id)

  if (isProductInCart) {
    $cart.set(
      $cart.get().map((cartItem) => {
        if (cartItem.id === product.id)
          return { ...cartItem, quantity: quantity }

        return cartItem
      })
    )
  } else {
    $cart.set([...$cart.get(), { ...product, quantity }])
  }
}
