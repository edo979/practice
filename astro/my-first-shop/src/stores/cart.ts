import { atom, computed } from 'nanostores'

export type CartItemT = {
  productId: string
  quantity: number
}

export const $cart = atom<CartItemT[]>([])
export const $cartItemsTotal = computed($cart, (products) =>
  products.reduce((prev, current) => prev + current.quantity, 0)
)

export const addProductInCartHandler = (productId: string) => {
  const isProductInCart = $cart
    .get()
    .find((product) => product.productId === productId)

  if (!isProductInCart) {
    $cart.set([...$cart.get(), { productId, quantity: 1 }])
  } else {
    $cart.set(
      $cart.get().map((product) => {
        if (product.productId === productId)
          return { ...product, quantity: product.quantity + 1 }

        return product
      })
    )
  }
}
