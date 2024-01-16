import { useEffect, useState } from 'react'
import Rating from '../components/Rating'
import { getProducts } from '../db/products'
import { Link, useLoaderData } from 'react-router-dom'

export async function loader({ request }) {
  const url = new URL(request.url)
  const currentLastId = url.searchParams.get('q')
  const { lastProductId, productBatch } = await getProducts({ currentLastId })

  return { lastProductId, productBatch }
}

const Root = () => {
  const { lastProductId, productBatch } = useLoaderData()
  const [downloadedProducts, setDownloadedProducts] = useState([])
  const [currentLastId, setCurrentLastId] = useState(null)

  useEffect(() => {
    setCurrentLastId(lastProductId)

    if (!currentLastId && currentLastId === lastProductId) return

    setDownloadedProducts((curr) => [...curr, ...productBatch])
  }, [lastProductId])

  //console.log(nextBatchData)

  return (
    <>
      <div className="mt-5 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 g-lg-4">
        {downloadedProducts.map((product, i) => (
          <div className="col" key={product.id + '' + i}>
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
        <Link to={`/?q=${lastProductId}`}>Load more products</Link>
      </div>
    </>
  )
}

export default Root
