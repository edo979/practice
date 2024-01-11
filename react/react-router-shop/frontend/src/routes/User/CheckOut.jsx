import { useLoaderData } from 'react-router-dom'
import { getOrder } from '../../db/order'
import { getUser } from '../../db/auth'

export async function loader({ params }) {
  const { orderId } = params

  await getUser()
  const res = await getOrder(orderId)
  const order = res.data

  return order
}

const CheckOut = () => {
  const order = useLoaderData()

  return <div>CheckOut {order.id}</div>
}

export default CheckOut
