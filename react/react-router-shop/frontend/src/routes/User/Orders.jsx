import { Link, useLoaderData, Form } from 'react-router-dom'
import { getOrders } from '../../db/order'
import { getUser } from '../../db/auth'
import { FaEdit, FaTrash } from 'react-icons/fa'

export async function loader() {
  await getUser()

  try {
    const res = await getOrders()
    const orders = res.data
    console.log(orders)
    return orders
  } catch (error) {
    console.log(error)
  }
  return null
}

const Orders = () => {
  const orders = useLoaderData()

  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <h1>Orders</h1>
        </div>
      </div>

      <div className="table-responsive-md">
        <table className="table table-primary table-striped ">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>PAYED</th>
              <th>SHIPPED</th>
              <th>DELIVERED</th>
              <th>COST</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order) => (
              <tr key={order.id}>
                <td
                  className="text-overflow"
                  style={{ maxWidth: '100px' }}
                  title={order.id}
                >
                  {order.id}
                </td>
                <td>{order.isPayed ? '✔' : '❌'}</td>
                <td>{order.isShipped ? '✔' : '❌'}</td>
                <td>{order.isDelivered ? '✔' : '❌'}</td>
                <td>{order.price}$</td>
                <td>
                  <Link to={order.id}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Orders
