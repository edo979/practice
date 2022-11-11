import { json, LinksFunction, LoaderFunction } from '@remix-run/node'
import { Link, Outlet } from '@remix-run/react'
import adminStyle from '~/style/admin.css'
import { requireUserId } from '~/utils/session.server'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: adminStyle }]
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)

  return json({})
}

export default function AdminRoute() {
  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">
          Jokes
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100 rounded-0 border-0"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <Link to="/logout" className="nav-link px-3">
              Sign out
            </Link>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3 sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link
                    to="/admin"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-home align-text-bottom"
                      aria-hidden="true"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/jokes" className="nav-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-file align-text-bottom"
                      aria-hidden="true"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    Jokes
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
