import { Outlet } from '@remix-run/react'

export default function SingleNoteLayoutRoute() {
  return (
    <div className="row">
      <Outlet />
    </div>
  )
}

export function ErrorBoundary() {
  return (
    <div className="alert alert-danger" role="alert">
      <h1>Error:</h1>
      <i>There was an error while loading note.</i>
    </div>
  )
}
