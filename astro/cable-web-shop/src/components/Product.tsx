import type { ProductT } from '../firebase/utility/firestore'
import { addToCart } from '../store/cart'

type ProductPropsT = {
  product: ProductT
}

const Product = ({ product }: ProductPropsT) => {
  return (
    <li>
      <h2>{product.name}</h2>
      <p>{product.desc}</p>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.price}$</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </li>
  )
}

export default Product
