import { Outlet } from 'react-router-dom'
import CheckOutNav from '../components/CheckOutNav'

const CheckoutLayout = () => {
  return (
    <>
      <CheckOutNav />
      <Outlet />
    </>
  )
}

export default CheckoutLayout
