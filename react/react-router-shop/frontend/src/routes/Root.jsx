import { getProducts } from '../db/products'
import { Link, useLoaderData } from 'react-router-dom'

export async function loader() {
  const products = await getProducts()
  return { products }
}

const Root = () => {
  const { products } = useLoaderData()

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 g-lg-4">
      {products.map((product) => (
        <div className="col">
          <div className="card h-100">
            <Link to={`/product/${product._id}`}>
              <img
                className="card-img-top"
                src={product.image}
                alt={product.name}
                style={{
                  maxHeight: '250px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </Link>
            <div className="card-body">
              <Link to={`/product/${product._id}`} className="text-reset">
                <h5 className="card-title">{product.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Root
