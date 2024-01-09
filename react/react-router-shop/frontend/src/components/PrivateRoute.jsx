import {
  NavLink,
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { getUser, logoutUser } from '../db/auth'

export async function loader() {
  const user = await getUser()

  if (user) {
    const idTokenResult = await user.getIdTokenResult()
    const isAdmin = idTokenResult.claims.role === 'admin'

    if (isAdmin) return redirect('/admin')
    return null
  }

  return redirect('/signin')
}

const PrivateRoute = () => {
  const navigation = useNavigation()
  const navigate = useNavigate()

  return (
    <div className="row h-100 align-content-start align-content-md-stretch">
      <nav className="col-md-2 col-xxl-1 pt-0 pt-md-4 nav nav-pills flex-row flex-md-column bg-dark">
        <NavLink to={`/me/cart`} className="text-md-center nav-link text-light">
          Cart
        </NavLink>
        <NavLink
          to={`/me/orders`}
          className="text-md-center nav-link text-light"
        >
          Orders
        </NavLink>
        <NavLink
          to={'/me/address'}
          className="text-md-center nav-link text-light"
        >
          Address
        </NavLink>
        <hr className="border-light d-none d-md-block" />
        <button
          className="btn btn-danger ms-auto mx-md-auto"
          onClick={() => {
            logoutUser()
            navigate('/')
          }}
        >
          Log Out
        </button>
      </nav>

      <div className="col-md-10 col-xxl-11 pt-4">
        {navigation.state === 'loading' ? (
          <div className="d-flex">
            <div
              className="mx-auto my-5 spinner-border text-primary fs-4"
              role="status"
              style={{ width: '5rem', height: '5rem' }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}

export default PrivateRoute
