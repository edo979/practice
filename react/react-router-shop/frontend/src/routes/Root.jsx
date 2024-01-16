import { useState } from 'react'
import Rating from '../components/Rating'
import { getProducts } from '../db/products'
import { Link, useLoaderData } from 'react-router-dom'

export async function loader() {
  const { products, numOfProducts } = await getProducts()
  return { products, numOfProducts }
}

const Root = () => {
  const { products, numOfProducts } = useLoaderData()
  const [productsBatch, setProductsBatch] = useState(products || [])

  const loadMoreProductHandler = async () => {
    const { products: newProducts } = await getProducts({
      currentLastId: productsBatch[productsBatch.length - 1].id,
    })

    setProductsBatch((prev) => [...prev, ...newProducts])
  }

  return (
    <>
      <div className="mt-5 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 g-lg-4">
        {productsBatch.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100">
              <Link to={`/product/${product.id}`}>
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
                <Link to={`/product/${product.id}`} className="text-reset">
                  <h2
                    className="card-title fs-4 text-overflow"
                    title={product.name}
                  >
                    {product.name}
                  </h2>
                </Link>
                <div className="mt-4 card-text text-primary">
                  <Rating value={product.rating} text={product.numReviews} />
                </div>
                <p className="card-text fs-2 text-secondary">
                  <b>{product.price}$</b>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 row">
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={loadMoreProductHandler}
            disabled={numOfProducts === productsBatch.length}
          >
            Load more products
          </button>
        </div>
      </div>
    </>
  )
}

export default Root
