import { useLoaderData } from 'react-router-dom'
import { getOrder } from '../../db/order'
import { getUser } from '../../db/auth'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useEffect } from 'react'
import { payPalSecret } from '../../../../secrets'

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
      .then((orderID) => {
        return orderID
      })
  }
  const onApprove = async () => {}

  return (
    <div>
      <h1 className="h5">CheckOut {order.id}</h1>

      {isPending ? <div>PayPal Loading...</div> : null}

      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  )
}

export default CheckOut
