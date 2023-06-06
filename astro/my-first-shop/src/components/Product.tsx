import type { ProductT } from '../pages/products/index.astro'
import { $cart } from '../stores/cart'

const product = ({ product }: { product: ProductT }) => {
  const addToChartBtn = document.querySelectorAll('[data-addToChart-button]')

  function addProductInCartHandler(productId: string) {
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

  return (
    <li>
      <p>{product.name}</p>
      <p>
        <b>{product.price}</b>
      </p>
      <button
        className="btn btn-primary"
        onClick={() => {
          addProductInCartHandler(product.id)
        }}
      >
        Buy
      </button>
    </li>
  )
}
export default product
