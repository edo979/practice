import { useState } from 'react'
import type { ProductT } from '../firebase/utility/firestore'
import { addToCart } from '../store/cart'

type ProductPropsT = {
  product: ProductT
}

const Product = ({ product }: ProductPropsT) => {
  const [quantity, setQuantity] = useState(1)

  function quantityHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let quantity = parseInt(e.target.value)
    if (!quantity || quantity < 1) quantity = 1
    setQuantity(quantity)
  }

  return (
    <li>
      <h2>{product.name}</h2>
      <p>{product.desc}</p>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.price}$</p>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={quantityHandler}
      />
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </li>
  )
}

export default Product
