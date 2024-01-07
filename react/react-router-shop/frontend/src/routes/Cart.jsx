import { useLoaderData } from 'react-router-dom'
import { addCartItem, getCartItems } from '../db/cart'
import { getUser } from '../db/auth'
import ErrorPage from '../components/ErrorPage'
import ErrorContent from '../components/ErrorContent'

export async function action({ request }) {
  const productId = (await request.formData()).get('productId')
  const data = { productId, quantity: 3 }

  try {
    await addCartItem(data)
  } catch (error) {
    console.log(error)
  }

  return null
}

export async function loader() {
  // this loader is used in navigation for shoving total chart item
  // because of that i handled error in this way
  try {
    // Just wait until auth initialize
    const user = await getUser()

    const res = await getCartItems()
    const items = res.data
    console.log(items)

    return { items }
  } catch (error) {
    return { items: [], error }
  }
}

const Cart = () => {
  const { items, error } = useLoaderData()

  return (
    <>
      {error ? (
        <ErrorContent error={error} />
      ) : (
        <div className="px-4">
          <div className="row">
            <h1>Cart</h1>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4">
                {items.map((item, i) => (
                  <div className="col">
                    <div
                      className="card h-100 position-relative"
                      key={item.id + i}
                    >
                      <img
                        className="card-img-top"
                        src={item.image}
                        alt={item.name}
                        style={{
                          maxHeight: '100px',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                      <div className="card-body">
                        <h3 className="card-title h5">{item.name}</h3>
                        <p className="card-text">
                          <i>$</i>
                          {item.price}
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-body-secondary">
                          quantity: {item.quantity}
                        </small>
                      </div>
                      <button
                        className="btn btn-sm btn-danger shadow border-1 border-light position-absolute top-0 end-0"
                        title="Remove from cart"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-4">
              <h2>Cart details</h2>
              <ol className="list-group list-group-numbered">
                {items.map((item, i) => (
                  <li
                    key={item.id + i}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{item.name}</div>
                      <i>$</i>
                      {(
                        parseFloat(item.price) * parseInt(item.quantity)
                      ).toFixed(2)}
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      {item.quantity}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="p-2 my-4 p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-2">
                <h2 className="mt-4">Total</h2>
                <p className="lead">
                  <i>Cart costs: </i>
                  <b>
                    {items.reduce(
                      (acc, curr) => curr.quantity * curr.price + acc,
                      0
                    )}
                  </b>
                  $
                </p>
              </div>
              <div className="d-flex mb-2">
                <button className="ms-auto btn btn-primary btn-lg">
                  Continue
                </button>
              </div>
              <small className="text-secondary">
                After clicking you'r browser will be redirected to shipping
                page.
              </small>
              <hr />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
