import { NavLink, Outlet, redirect } from 'react-router-dom'
import { getUser } from '../db/auth'

export async function loader() {
  const user = await getUser()
  console.log(user)

  if (!user) return redirect('/signin')
  return null
}

const PrivateRoute = () => {
  return (
    <div className="row h-100 align-content-start align-content-md-stretch">
      <nav className="col-md-2 col-xxl-1 pt-0 pt-md-4 nav nav-pills flex-row flex-md-column bg-dark">
        <NavLink
          to={`/admin/productslist`}
          className="text-md-center nav-link text-light"
        >
          Orders
        </NavLink>
        <NavLink
          to={'/admin/userslist'}
          className="text-md-center nav-link text-light"
        >
          Address
        </NavLink>
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
