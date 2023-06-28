import { useState } from 'react'
import type { ProductT } from '../../firebase/utility/firestore'

const ViewProduct = ({ product }: { product: ProductT }) => (
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

const EditProduct = ({ cancelEdit }: { cancelEdit: () => void }) => (
  <div>
    <button onClick={cancelEdit}>✖️ Cancel</button>
    <button>💾 Save</button>
  </div>
)

const Product = ({ product }: { product: ProductT }) => {
  const [isEdit, setIsEdit] = useState(false)
  let content

  async function handleDelete() {
    if (!confirm('Pruduct will be deleted. Are you shure?')) return
    const res = await fetch(`/dashboard/${product.id}`, { method: 'delete' })
    if (res.redirected) window.location.assign(res.url)
    return
  }

  if (isEdit) {
    content = <EditProduct cancelEdit={() => setIsEdit(false)} />
  } else {
    content = (
      <>
        <ViewProduct product={product} />
        <div>
          <button onClick={() => setIsEdit(true)}>✏️</button>
          <button onClick={handleDelete}>❌</button>
        </div>
      </>
    )
  }

  return content
}

export default Product
