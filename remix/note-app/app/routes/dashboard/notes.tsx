import { Outlet, useCatch } from '@remix-run/react'

export default function NotesLayoutRoute() {
  return <Outlet />
}

export function ErrorBoundary() {
  return (
    <div className="alert alert-danger" role="alert">
      <h1>Error:</h1>
      <i>There was an error while loading notes.</i>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  if (caught.status === 401) {
    return (
      <div className="alert alert-danger" role="alert">
        You must be logged in!
      </div>
    )
  }
  throw new Error(`Unhandled error: ${caught.status}`)
}
