import { NavLink, Outlet, useNavigation } from 'react-router-dom'

const AdminRoute = () => {
  const navigation = useNavigation()

  return (
    <div className="row h-100 align-content-start align-content-md-stretch">
      <nav className="col-md-2 col-xxl-1 pt-0 pt-md-4 nav nav-pills flex-row flex-md-column bg-dark">
        <NavLink
          to={`/admin/productslist`}
          className="text-md-center nav-link text-light"
        >
          Products
        </NavLink>
        <NavLink
          to={'/admin/userslist'}
          className="text-md-center nav-link text-light"
        >
          Users
        </NavLink>
        <NavLink
          to={'/admin/orderlist'}
          className="text-md-center nav-link text-light"
        >
          Orders
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

export default AdminRoute
