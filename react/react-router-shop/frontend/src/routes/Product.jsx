import { useLoaderData } from 'react-router-dom'

export async function loader({ params }) {
  const product = { id: params.id }
  console.log(product)

  return { product }
}

const Product = () => {
  const { product } = useLoaderData()

  return <div>{product.id}</div>
}

export default Product
