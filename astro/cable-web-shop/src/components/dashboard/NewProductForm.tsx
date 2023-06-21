import { useState } from 'react'

type ActionDataT = {
  formError?: string
  fields?: {
    name?: string
    price?: string
  }
  fieldsError?: {
    name?: string
    price?: string
    image?: string
  }
}

const NewProductForm = () => {
  const [productImage, setProductImage] = useState<File | null>(null)
  const [productName, setProductName] = useState<string>()
  const [productPrice, setProductPrice] = useState<string>()
  const [actionData, setActionData] = useState<ActionDataT>({})

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) setProductImage(event.target.files[0])
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData()
    if (productImage) {
      formData.append('product_image', productImage)
    }

    const res = await fetch('/api/products', {
      method: 'post',
      body: formData,
    })

    if (!res.ok) {
      setActionData(await res.json())
      console.log(actionData)
    }

    console.log(res.status)
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      {actionData.formError && <p>{actionData.formError}</p>}

      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      {actionData.fieldsError?.name && <p>{actionData.fieldsError.name}</p>}

      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" />
      {actionData.fieldsError?.price && <p>{actionData.fieldsError.price}</p>}

      <input type="file" name="image" id="image" onChange={handleFileChange} />
      {actionData.fieldsError?.image && <p>{actionData.fieldsError.image}</p>}

      <button type="submit">Add new product</button>
    </form>
  )
}
export default NewProductForm
