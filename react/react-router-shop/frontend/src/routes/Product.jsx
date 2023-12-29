import { useLoaderData } from 'react-router-dom'
import { getProduct } from '../db/products'

export async function loader({ params }) {
  const product = await getProduct(params.id)
  console.log(product)

  return { product }
}

const Product = () => {
  const { product } = useLoaderData()

  return <div>{product.name}</div>
}

export default Product
