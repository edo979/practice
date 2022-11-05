import { Outlet } from '@remix-run/react'

export default function Index() {
  return (
    <div className="row">
      <div className="col col-sm-4 p-3 text-bg-light">
        <h1 className="display-6 text-center border-bottom pb-2">Jokes</h1>
      </div>

      <div className="col col-sm-8">
        <Outlet />
      </div>
    </div>
  )
}
