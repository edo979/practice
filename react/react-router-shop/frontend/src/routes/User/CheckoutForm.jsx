import { Form } from 'react-router-dom'

const CheckoutForm = () => {
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
            <span className="badge bg-primary rounded-pill">3</span>
          </h2>

          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h3 className="my-0 h6">Product name</h3>
                <small className="text-body-secondary">Brief description</small>
              </div>
              <span className="text-body-secondary">$12</span>
            </li>
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
