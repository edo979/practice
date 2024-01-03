import { NavLink, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  return (
    <div className="row">
      <nav className="col-md-2 col-xl-1 pt-0 pt-md-4 nav nav-pills flex-row flex-md-column bg-dark">
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

      <div className="col-md-10 col-xl-11 pt-4">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminRoute
