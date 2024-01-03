import { Outlet } from 'react-router-dom'

const AdminRoute = () => {
  return (
    <div className="row">
      <div className="col-md-2 bg-dark text-light">
        <ul className="d-flex flex-md-column gap-4 gap-md-0">
          <li>Products</li>
          <li>Users</li>
          <li>Orders</li>
        </ul>
      </div>
      <div className="col-md-10">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminRoute
