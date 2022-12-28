import { Outlet } from '@remix-run/react'

export default function SingleNoteLayoutRoute() {
  return (
    <div className="row">
      <Outlet />
    </div>
  )
}
