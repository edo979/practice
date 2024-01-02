import { useLoaderData } from 'react-router-dom'

const EditProduct = () => {
  const { product } = useLoaderData()

  return <div>EditProduct {product.name}</div>
}

export default EditProduct
