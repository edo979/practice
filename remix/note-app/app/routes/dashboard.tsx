import { Outlet } from '@remix-run/react'

export default function DashboardRoute() {
  return (
    <div>
      <h1>Dashboard route</h1>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
