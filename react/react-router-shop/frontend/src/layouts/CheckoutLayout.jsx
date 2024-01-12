import { Outlet, useLoaderData } from 'react-router-dom'
import CheckOutNav from '../components/CheckOutNav'

const CheckoutLayout = () => {
  const order = useLoaderData()

  return (
    <>
      <CheckOutNav orderId={order?.id} />
      <Outlet />
    </>
  )
}

export default CheckoutLayout
