import type { ProductT } from '../../firebase/utility/firestore'

const Product = ({ product }: { product: ProductT }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.desc}</p>
      <img src={product.imageUrl} alt={product.name} />
      <p>
        <b>{product.price}</b>
      </p>
      <p>
        <i>Added: {product.created_at.toLocaleDateString()}</i>
      </p>
    </div>
  )
}

export default Product
