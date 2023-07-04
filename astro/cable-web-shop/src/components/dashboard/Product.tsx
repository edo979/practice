import { useRef, useState } from 'react'
import type { ProductT } from '../../firebase/utility/firestore'
import type { ActionDataT } from '../../pages/dashboard/index.astro'

type EditProductPropT = {
  cancelEdit: () => void
  product: ProductT
}

const ViewProduct = ({
  product,
  handleEdit,
}: {
  product: ProductT
  handleEdit: () => void
}) => {
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
        <button onClick={handleEdit}>✏️</button>
        <button onClick={handleDelete}>❌</button>
      </div>
    </div>
  )
}

const EditProduct = ({ cancelEdit, product }: EditProductPropT) => {
  const [newImageUrl, setNewImageUrl] = useState<string>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [actionData, setActionData] = useState<ActionDataT>({})
  const nameRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setNewImageUrl(URL.createObjectURL(file))
      setSelectedFile(file)
    }

    return
  }

  async function saveHandler() {
    const formData = new FormData()
    if (nameRef.current && nameRef.current.value !== product.name)
      formData.append('name', nameRef.current.value)
    // if (descRef.current && descRef.current.value !== product.desc)
    //   formData.append('desc', descRef.current.value)
    if (priceRef.current && priceRef.current.value !== product.price.toString())
      formData.append('price', priceRef.current.value)
    if (selectedFile) formData.append('product_image', selectedFile)

    // send data if change is made
    if (Array.from(formData.values()).length > 0) {
      const res = await fetch(`/dashboard/${product.id}`, {
        method: 'PATCH',
        body: formData,
      })

      if (res.redirected) {
        window.location.assign(res.url)
      } else {
        setActionData(await res.json())
      }
    }
  }

  return (
    <div>
      {actionData.formError && <p>{actionData.formError}</p>}
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        defaultValue={product.name}
        ref={nameRef}
      />
      {actionData.fieldsError?.name && <p>{actionData.fieldsError.name}</p>}

      <br />
      <label htmlFor="desc">Description:</label>
      <input
        type="text"
        name="desc"
        id="desc"
        defaultValue={product.desc}
        ref={descRef}
      />

      <br />
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        name="price"
        id="price"
        min="0"
        step="0.01"
        defaultValue={product.price}
        ref={priceRef}
      />

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
      <button onClick={saveHandler}>💾 Save</button>
    </div>
  )
}

const Product = ({ product }: { product: ProductT }) => {
  const [isEdit, setIsEdit] = useState(false)
  let content

  if (isEdit) {
    content = (
      <EditProduct cancelEdit={() => setIsEdit(false)} product={product} />
    )
  } else {
    content = (
      <ViewProduct product={product} handleEdit={() => setIsEdit(true)} />
    )
  }

  return content
}

export default Product
