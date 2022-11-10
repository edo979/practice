import { Outlet } from '@remix-run/react'

export default function AdminRoute() {
  return (
    <>
      <h1>admin</h1>
      <Outlet />
    </>
  )
}
