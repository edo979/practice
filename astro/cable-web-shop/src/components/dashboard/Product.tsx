import type { ProductT } from '../../firebase/utility/firestore'

const Product = ({ product }: { product: ProductT }) => {
  async function handleDelete() {
    if (!confirm('Pruduct will be deleted. Are you shure?')) return
    const res = await fetch(`/dashboard/${product.id}`, { method: 'delete' })
    if (res.redirected) window.location.assign(res.url)
    return
  }

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

      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default Product
