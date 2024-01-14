import { useLoaderData } from 'react-router-dom'
import { getUser } from '../../db/auth'
import { getOrder } from '../../db/order'
import { totalCartPrice, totalItemsPrice } from '../../utilities/cart'

export async function loader({ params }) {
  const { orderId } = params
  if (!orderId) throw new Error("There isn' order id!")

  await getUser()
  const res = await getOrder(orderId)
  const order = res.data

  return order
}

const Order = () => {
  const order = useLoaderData()

  return (
    <div className="row">
      {order === null ? (
        <p>Error retrieving order data!</p>
      ) : (
        <div className="col-lg-6">
          <h1 className="h4 mt-2 mb-4">Order id: {order.id}</h1>
          <hr />
          <p className="lead">User details:</p>
          <p>
            <b>First Name:</b> {order.firstName}
          </p>
          <p>
            <b>Last Name:</b> {order.lastName}
          </p>
          <p>
            <b>Customer email:</b> {order.email}
          </p>
          <p>
            <b>Address:</b> {order.address}
          </p>
          {order.address2 && (
            <p>
              <b>Address:</b> {order.address2}
            </p>
          )}
          <p>
            <b>State:</b> {order.state}
          </p>
          <p>
            <b>Zip:</b> {order.zip}
          </p>
          <p>
            <b>Country:</b> {order.country}
          </p>

          <hr />

          <p className="lead">Payment details:</p>
          <p>
            <b>Transaction id:</b> {order.paymentResults.id}
          </p>
          <p>
            <b>Payer email:</b> {order.paymentResults.email}
          </p>
          <p>
            <b>Pay status:</b> {order.paymentResults.status}
          </p>
          <p>
            <b>Payment time:</b>{' '}
            {new Date(order.paymentResults.update_time).toLocaleString(
              undefined,
              {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
          </p>

          <hr />
          <p className="lead">Cart details:</p>
          <ol className="list-group list-group-numbered">
            {order.items.map((item) => (
              <li
                key={item.name}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{item.name}</div>
                  <small className="d-block">
                    <b>Category: </b>
                    {item.category}
                  </small>
                  <small>
                    <b>Brand: </b>
                    {item.brand}
                  </small>
                  <p>
                    <b>Price: </b>
                    {item.price}$
                  </p>
                  <p>
                    <b>Total price: </b>
                    {totalItemsPrice(item.price, item.quantity)}$
                  </p>
                </div>
                <div>
                  <small>quantity: </small>
                  <span className="badge bg-primary rounded-pill">
                    {item.quantity}
                  </span>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-2 alert alert-primary fs-5">
            <b>Total price: </b>
            {totalCartPrice(order.items)}$
          </p>
        </div>
      )}
    </div>
  )
}

export default Order
