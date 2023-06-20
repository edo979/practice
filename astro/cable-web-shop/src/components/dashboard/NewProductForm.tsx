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
  }
}

const NewProductForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) setSelectedFile(event.target.files[0])
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(selectedFile)
    const formData = new FormData()
    formData.append('name', 'jah')
    formData.append('price', '55')
    if (selectedFile) {
      formData.append('product_image', selectedFile)
    }

    const res = await fetch('/api/products', {
      method: 'post',
      body: formData,
    })

    if (res.ok) {
      const data = await res.json()
      console.log(data)
    }

    console.log(res.status)
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      {/* {actionData.formError && <p>{actionData.formError}</p>} */}
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" />
      <input type="file" name="image" id="image" onChange={handleFileChange} />
      <button type="submit">Add new product</button>
    </form>
  )
}
export default NewProductForm
