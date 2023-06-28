import { useState } from 'react'
import type { ProductT } from '../../firebase/utility/firestore'

type EditProductPropT = {
  cancelEdit: () => void
  product: ProductT
}

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

const EditProduct = ({ cancelEdit, product }: EditProductPropT) => {
  const [newImageUrl, setNewImageUrl] = useState<string>()

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setNewImageUrl(URL.createObjectURL(file))
    }

    return
  }

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" value={product.name} />

      <br />
      <label htmlFor="desc">Description:</label>
      <input type="text" name="desc" id="desc" value={product.desc} />

      <br />
      <label htmlFor="price">Price:</label>
      <input type="number" name="price" id="price" value={product.price} />

      <img src={newImageUrl || product.imageUrl} alt={product.name} />
      <label htmlFor="product_image">Change image</label>
      <input
        type="file"
        name="product_image"
        id="product_image"
        onChange={handleImage}
        hidden
      />

      <br />
      <button onClick={cancelEdit}>✖️ Cancel</button>
      <button>💾 Save</button>
    </div>
  )
}

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
    content = (
      <EditProduct cancelEdit={() => setIsEdit(false)} product={product} />
    )
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
