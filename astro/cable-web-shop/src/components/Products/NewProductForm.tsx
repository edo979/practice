import { useEffect } from 'react'

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
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <form method="post">
      {/* {actionData.formError && <p>{actionData.formError}</p>} */}
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" />
      <button type="submit">Add new product</button>
    </form>
  )
}
export default NewProductForm
