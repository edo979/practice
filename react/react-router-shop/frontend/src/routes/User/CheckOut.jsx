import { useLoaderData } from 'react-router-dom'
import { getOrder } from '../../db/order'

export async function loader({ params }) {
  const { orderId } = params
  //const order = getOrder(orderId)

  return { orderId }
}

const CheckOut = () => {
  const { orderId } = useLoaderData()

  return <div>CheckOut {orderId}</div>
}

export default CheckOut
