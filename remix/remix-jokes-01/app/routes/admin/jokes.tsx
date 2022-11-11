import { Outlet } from '@remix-run/react'

export default function AdminJokesRoute() {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 my-0">
      <Outlet />
    </div>
  )
}
