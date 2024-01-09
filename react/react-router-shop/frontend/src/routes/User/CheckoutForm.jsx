import { Form } from 'react-router-dom'

const CheckoutForm = () => {
  return (
    <>
      <div className="py-5 text-center">
        <h1>Checkout form</h1>
        <p className="lead">
          Below is your chart items, please checkout once more before confirm
          paying. Please fill information about you'r address where we're send
          your items.
        </p>
      </div>

      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
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
        <div className="col-md-7 col-lg-8">
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
              <div className="col-12"></div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CheckoutForm
