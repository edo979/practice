import { useState } from 'react'
import type { ProductT } from '../pages/products/index.astro'
import { addProductInCartHandler } from '../stores/cart'

const product = ({ product }: { product: ProductT }) => {
  const [quantity, setQuantity] = useState(0)

  return (
    <>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>
        <b>{product.price}</b>
      </p>
      <img src={product.imageUrl} alt={product.name} />
      <div className="join space-x-2">
        <input
          className="w-16 px-2 input input-bordered"
          type="number"
          name="quantity"
          placeholder="0"
          min={0}
          max={50}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            addProductInCartHandler(product, quantity)
          }}
        >
          🛒 Add
        </button>
      </div>
    </>
  )
}
export default product
