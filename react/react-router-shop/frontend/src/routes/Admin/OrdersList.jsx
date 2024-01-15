import { getOrders } from '../../db/admin'
import { getUser } from '../../db/auth'

export async function loader() {
  await getUser()
  const res = await getOrders()

  return null
}

const OrdersList = () => {
  return <div>OrdersList</div>
}

export default OrdersList
