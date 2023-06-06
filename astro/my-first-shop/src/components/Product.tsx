import { useState } from 'react'
import type { ProductT } from '../pages/products/index.astro'
import { addProductInCartHandler } from '../stores/cart'

const product = ({ product }: { product: ProductT }) => {
  const [quantity, setQuantity] = useState(0)

  return (
    <li>
      <p>{product.name}</p>
      <p>
        <b>{product.price}</b>
      </p>
      <div className="join space-x-2">
        <input
          className="w-16 px-2 input input-bordered"
          type="number"
          name="quantity"
          placeholder="0"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            addProductInCartHandler(product.id, quantity)
          }}
        >
          🛒 Add
        </button>
      </div>
    </li>
  )
}
export default product
