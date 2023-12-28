import { getProducts } from '../db/products'
import { useLoaderData } from 'react-router-dom'

export async function loader() {
  const products = await getProducts()
  return { products }
}

const Root = () => {
  const { products } = useLoaderData()

  return (
    <div>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </div>
  )
}

export default Root
