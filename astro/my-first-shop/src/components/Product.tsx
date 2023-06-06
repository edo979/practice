import type { ProductT } from '../pages/products/index.astro'
import { addProductInCartHandler } from '../stores/cart'

const product = ({ product }: { product: ProductT }) => {
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
        🛒 Add
      </button>
    </li>
  )
}
export default product
