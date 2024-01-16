import Pagination from '../components/Pagination'
import Rating from '../components/Rating'
import { getProducts } from '../db/products'
import { Form, Link, useActionData, useLoaderData } from 'react-router-dom'

export async function loader() {
  const { lastProductId, productBatch } = await getProducts()
  return { lastProductId, productBatch }
}

export async function action({ request }) {
  const formData = await request.formData()
  const currentLastProductId = formData.get('lastProductId')
  const nextBatchData = { nextLastProductId: null, nextProductBatch: null }

  const { lastProductId, productBatch } = await getProducts(
    currentLastProductId
  )
  nextBatchData.nextLastProductId = lastProductId
  nextBatchData.nextProductBatch = productBatch

  return nextBatchData
}

const Root = () => {
  const { lastProductId, productBatch } = useLoaderData()
  const nextBatchData = useActionData()
  console.log(nextBatchData)

  return (
    <>
      <div className="mt-5 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 g-lg-4">
        {productBatch.map((product) => (
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
        <Form method="post">
          <input type="hidden" name="lastProductId" value={lastProductId} />
          <button className="btn btn-primary">Load more products</button>
        </Form>
      </div>
    </>
  )
}

export default Root
