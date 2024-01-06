import { Form, Link, useLoaderData } from 'react-router-dom'
import { getProduct } from '../db/products'
import Rating from '../components/Rating'
import { useFetcher } from 'react-router-dom'

export async function loader({ params }) {
  const product = await getProduct(params.id)

  return { product }
}
import { FaArrowLeft } from 'react-icons/fa'

const Product = () => {
  const { product } = useLoaderData()
  const fetcher = useFetcher()

  return (
    <>
      <Link to={'..'} className="mt-5 btn btn-primary">
        <FaArrowLeft /> Back
      </Link>
      <hr className="my-4" />

      <div className="row">
        <div className="col col-md-10 col-xl-8 offset-xl-2">
          <h1>{product.name}</h1>
          <p className="fs-1">
            <b>{product.price}$</b>
          </p>
          <div className="text-primary">
            <Rating value={product.rating} text={product.numReviews} />
          </div>
          <img src={product.image} className="w-100 h-50 my-5" />
          <div className="fs-5">{product.description}</div>

          <h2 className="mt-3">Reviews</h2>
        </div>

        <div className="col col-md-2 text-center">
          <fetcher.Form method="post" action="/me/cart">
            <input type="hidden" name="productId" value={product.id} />
            <button className="btn btn-primary">Add to Chart</button>
          </fetcher.Form>
        </div>
      </div>
    </>
  )
}

export default Product
