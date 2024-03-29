import { useEffect, useRef } from 'react'
import {
  redirect,
  useActionData,
  useFetcher,
  useLoaderData,
} from 'react-router-dom'
import { totalCartPrice, totalItemsPrice } from '../../utilities/cart'
import { createOrder } from '../../db/order'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { payPalSecret } from '../../../../secrets'
import classNames from 'classnames'

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const errors = { formError: 'Error submitting form!' }

  try {
    await createOrder(data)
    return redirect('/me/orders')
  } catch (error) {
    if (error.code.toLowerCase().includes('internal')) {
      errors.formError = error.message
      return errors
    }

    errors.fieldsError = error.details
    return errors
  }
}

const CheckoutForm = () => {
  const { items } = useLoaderData()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const fetcher = useFetcher()
  const addressFormRef = useRef(null)
  let errors = fetcher.data

  useEffect(() => {
    async function loadPaypalScript() {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': payPalSecret,
          currency: 'USD',
        },
      })
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
    }

    if (!window.paypal) loadPaypalScript()
  }, [])

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: 30,
              currency_code: 'USD',
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId
      })
  }
  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture()
      await payOrder(details)
    } catch (error) {
      console.log(error)
    }
  }

  const onApproveTest = async () => {
    await payOrder({
      id: 'from test',
      status: 'from test',
      update_time: Date.now(),
      payer: { email_address: 'from test' },
    })
  }

  const payOrder = async (data) => {
    const formData = new FormData(addressFormRef.current)
    formData.append('paymentId', data.id)
    formData.append('status', data.status)
    formData.append('update_time', data.update_time)
    formData.append('payerEmail', data.payer.email_address)

    fetcher.submit(formData, { method: 'post' })
  }

  return (
    <>
      <div className="py-5 text-center">
        <div className="d-block mx-auto mb-4 fs-2">🛒</div>
        <h1>Checkout form</h1>
        <p className="lead">
          Below is your chart items, please checkout once more before confirm
          paying. Please fill information about you'r address where we'll send
          your items.
        </p>
        {errors && <p>{errors.formError}</p>}
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

                <p className="text-end mt-2">
                  <b>Total: </b>
                  <i>
                    {item.quantity} * ${item.price}
                  </i>{' '}
                  = $<b>{totalItemsPrice(item.price, item.quantity)}</b>
                </p>
              </li>
            ))}
            <li className="list-group-item active py-3">
              <p className="text-end fs-4 m-0">
                <b>Total: </b>
                {totalCartPrice(items)} $
              </p>
            </li>
          </ul>
          <hr />
          {isPending ? <div>PayPal Loading...</div> : null}

          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
          {import.meta.env.DEV && (
            <button className="btn btn-danger" onClick={onApproveTest}>
              Test Payment
            </button>
          )}
          <hr />
        </div>

        <div className="col-md-6 col-lg-7">
          <h2 className="h4 mb-3">Billing address</h2>

          <fetcher.Form ref={addressFormRef}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={classNames('form-control', {
                    'is-invalid': errors?.fieldsError?.firstName,
                  })}
                  aria-describedby={
                    errors?.fieldsError?.firstName
                      ? 'name-field-error'
                      : undefined
                  }
                />
                {errors?.fieldsError?.firstName && (
                  <p id="firstName-field-error" className="invalid-feedback">
                    {errors.fieldsError.firstName}
                  </p>
                )}
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={classNames('form-control', {
                    'is-invalid': errors?.fieldsError?.lastName,
                  })}
                  aria-describedby={
                    errors?.fieldsError?.lastName
                      ? 'name-field-error'
                      : undefined
                  }
                />
                {errors?.fieldsError?.lastName && (
                  <p id="lastName-field-error" className="invalid-feedback">
                    {errors.fieldsError.lastName}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={classNames('form-control', {
                    'is-invalid': errors?.fieldsError?.email,
                  })}
                  aria-describedby={
                    errors?.fieldsError?.email ? 'name-field-error' : undefined
                  }
                />
                {errors?.fieldsError?.email && (
                  <p id="email-field-error" className="invalid-feedback">
                    {errors.fieldsError.email}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={classNames('form-control', {
                    'is-invalid': errors?.fieldsError?.address,
                  })}
                  aria-describedby={
                    errors?.fieldsError?.address
                      ? 'name-field-error'
                      : undefined
                  }
                />
                {errors?.fieldsError?.address && (
                  <p id="address-field-error" className="invalid-feedback">
                    {errors.fieldsError.address}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="address2" className="form-label">
                  Address 2 (Optional)
                </label>
                <input
                  type="text"
                  name="address2"
                  id="address2"
                  className={classNames('form-control', {
                    'is-invalid': errors?.fieldsError?.address2,
                  })}
                  aria-describedby={
                    errors?.fieldsError?.address2
                      ? 'name-field-error'
                      : undefined
                  }
                />
                {errors?.fieldsError?.address2 && (
                  <p id="address2-field-error" className="invalid-feedback">
                    {errors.fieldsError.address2}
                  </p>
                )}
              </div>
              <div className="col-md-5">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className={classNames('form-control', {
                    'is-invalid': errors?.fieldsError?.country,
                  })}
                  aria-describedby={
                    errors?.fieldsError?.country
                      ? 'name-field-error'
                      : undefined
                  }
                />
                {errors?.fieldsError?.country && (
                  <p id="country-field-error" className="invalid-feedback">
                    {errors.fieldsError.country}
                  </p>
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  className={classNames('form-control', {
                    'is-invalid': errors?.fieldsError?.state,
                  })}
                  aria-describedby={
                    errors?.fieldsError?.state ? 'name-field-error' : undefined
                  }
                />
                {errors?.fieldsError?.state && (
                  <p id="state-field-error" className="invalid-feedback">
                    {errors.fieldsError.state}
                  </p>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  className={classNames('form-control', {
                    'is-invalid': errors?.fieldsError?.zip,
                  })}
                  aria-describedby={
                    errors?.fieldsError?.zip ? 'name-field-error' : undefined
                  }
                />
                {errors?.fieldsError?.zip && (
                  <p id="zip-field-error" className="invalid-feedback">
                    {errors.fieldsError.zip}
                  </p>
                )}
              </div>
            </div>
            <hr className="my-4" />
            <h2 className="h4 mb-3">Payment</h2>
            <p>PayPal</p>
            <hr className="my-4" />
          </fetcher.Form>
        </div>
      </div>
    </>
  )
}

export default CheckoutForm
