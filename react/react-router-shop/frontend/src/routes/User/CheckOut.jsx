import { useLoaderData } from 'react-router-dom'
import { getOrder, payOrder } from '../../db/order'
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
    <div>
      <h1 className="h5">CheckOut {order.id}</h1>

      {isPending ? <div>PayPal Loading...</div> : null}

      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      {import.meta.env.DEV && (
        <button className="btn btn-danger" onClick={onApproveTest}>
          Test Payment
        </button>
      )}
    </div>
  )
}

export default CheckOut
