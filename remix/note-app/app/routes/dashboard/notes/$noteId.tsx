import { Outlet, useCatch } from '@remix-run/react'

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
      <i>There was an error while reading/write note.</i>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 403) {
    return (
      <div className="alert alert-danger" role="alert">
        That note is not yours!
      </div>
    )
  }
  throw new Error(`Unhandled error: ${caught.status}`)
}
