import { Form, useLoaderData } from 'react-router-dom'
import { totalItemsPrice } from '../../utilities/cart'
import { createOrder } from '../../db/order'

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await createOrder(data)
  } catch (error) {
    console.log(error)
  }

  return null
}

const CheckoutForm = () => {
  const { items, error } = useLoaderData()
  return (
    <>
      <div className="py-5 text-center">
        <div className="d-block mx-auto mb-4 fs-2">🛒</div>
        <h1>Checkout form</h1>
        <p className="lead">
          Below is your chart items, please checkout once more before confirm
          paying. Please fill information about you'r address where we're send
          your items.
        </p>
      </div>

      <div className="row g-5 g-md-2 g-lg-5">
        <div className="col-md-6 col-lg-5 order-md-last">
          <h2 className="h4 d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">
              {items.reduce((acc, curr) => curr.quantity + acc, 0)}
            </span>
          </h2>

          <ul className="list-group mb-3">
            {items.map((item) => (
              <li className="list-group-item text-truncate lh-sm" key={item.id}>
                <h3 className="my-0 h6">{item.name}</h3>
                <small className="d-block">
                  <i> Brand: {item.brand}</i>
                </small>
                <small className="text-body-secondary" title={item.description}>
                  {item.description}
                </small>
                <hr />
                <div className="d-flex justify-content-between">
                  <p>
                    <b>Total: </b>
                    <i>
                      {item.quantity} * ${item.price}
                    </i>{' '}
                    = $<b>{totalItemsPrice(item.price, item.quantity)}</b>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6 col-lg-7">
          <h2 className="h4 mb-3">Billing address</h2>

          <Form method="post">
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="address2" className="form-label">
                  Address 2 (Optional)
                </label>
                <input
                  type="text"
                  name="address2"
                  id="address2"
                  className="form-control"
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <h2 className="h4 mb-3">Payment</h2>
            <p>PayPal</p>
            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Continue to checkout
            </button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CheckoutForm
