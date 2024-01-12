import { useLoaderData } from 'react-router-dom'
import { getOrder, payOrder } from '../../db/order'
import { getUser } from '../../db/auth'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useEffect } from 'react'
import { payPalSecret } from '../../../../secrets'
import { totalCartPrice, totalItemsPrice } from '../../utilities/cart'

export async function loader({ params }) {
  const { orderId } = params

  await getUser()
  const res = await getOrder(orderId)
  const order = res.data

  console.log(order)
  return order
}

const CheckOut = () => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const order = useLoaderData()

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
      await payOrder({ orderId: order.id, details })
    } catch (error) {
      console.log(error)
    }
  }

  const onApproveTest = async () => {
    await payOrder({
      orderId: order.id,
      details: {
        id: 'from test',
        status: 'from test',
        update_time: Date.now(),
        payer: { email_address: 'from test' },
      },
    })
  }

  return (
    <div className="row g-lg-5 px-lg-5">
      <div className="col-md-6 col-lg-7 lh-1">
        <h1 className="h2">CheckOut</h1>
        <hr />
        <h2 className="h4 mt-4">Address details:</h2>
        <p className="lead">
          <b>
            {order.firstName} {order.lastName}
          </b>
        </p>
        <p>{order.email}</p>
        <p>{order.address}</p>
        {order.address2 && <p>{order.address2}</p>}
        <p>
          {order.country}, {order.state}, {order.zip}
        </p>
        <hr />
        <h2 className="h4 mt-4">Billing details:</h2>
        <ol>
          {order.items.map((item) => (
            <li className="lh-sm" key={item.name}>
              <p className="m-0">{item.name}</p>
              <p className="border-bottom pb-2">
                <i>
                  {item.price}$ * {item.quantity} ={' '}
                  {totalItemsPrice(item.price, item.quantity)}$
                </i>
              </p>
            </li>
          ))}
        </ol>
        <p className="h4 mt-5">
          <b>Total: </b>
          {totalCartPrice(order.items)} $
        </p>
        <hr className="mt-4" />
      </div>
      <div className="col-md-6 col-lg-5">
        {isPending ? <div>PayPal Loading...</div> : null}

        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        {import.meta.env.DEV && (
          <button className="btn btn-danger" onClick={onApproveTest}>
            Test Payment
          </button>
        )}
      </div>
    </div>
  )
}

export default CheckOut
