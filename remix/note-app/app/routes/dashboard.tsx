import { LinksFunction, LoaderFunction, redirect } from '@remix-run/node'
import {
  Form,
  Link,
  NavLink,
  Outlet,
  useCatch,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react'
import { getUser, requireUser, requireUserId } from '~/sessions.server'
import styles from '~/style/dashboard.css'

type LoaderData = {
  user: {
    id: string
    email: string
  }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  return { user: { id: user.id, email: user.email } } as LoaderData
}

export default function DashboardRoute() {
  const { user } = useLoaderData() as LoaderData

  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">
          Notes App
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
            <Form action="/logout" method="post" className="nav-link px-3">
              <button
                className="btn btn-dark d-flex align-items-center gap-1"
                id="logout-btn"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="feather"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                  />
                </svg>
                Sign out
              </button>
            </Form>
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
                  <NavLink to="/dashboard" className="nav-link" end>
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
                  </NavLink>
                </li>
              </ul>

              <hr className="mx-3" />

              <h6 className="sidebar-heading px-3 mt-4 mb-1 text-muted text-uppercase">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="feather align-text-bottom"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
                User Profile
              </h6>

              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <i className="nav-link" id="user-profile">
                    {user.email}
                  </i>
                </li>

                <li className="nav-item">
                  <Form
                    action="/dashboard/delete-user"
                    method="post"
                    className="nav-link"
                  >
                    <button
                      className="btn btn-sm btn-outline-danger d-flex align-items-center"
                      id="delete-user-btn"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="feather"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      Delete Account
                    </button>
                  </Form>
                </li>

                <hr className="mx-3" />
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h3 m-0">Dashboard</h1>

              <div className="btn-toolbar mb-2 mb-md-0">
                <Link to={'notes/new'} className="text-decoration-none">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                    id="createNoteBtn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-plus-circle align-text-bottom"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span>Create new note</span>
                  </button>
                </Link>
              </div>
            </div>

            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 401) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="alert alert-danger mt-5" role="alert">
              You must be logged in!
              <hr />
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  throw new Error(`Unhandled error: ${caught.status}`)
}
