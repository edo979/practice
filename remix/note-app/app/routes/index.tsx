import { LoaderFunction } from '@remix-run/node'
import { Form, Link, NavLink, useLoaderData } from '@remix-run/react'
import { getUser } from '~/sessions.server'

type LoaderData =
  | {
      email?: string
      id?: string
    }
  | undefined

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUser(request)
  if (!user) return null

  const data: LoaderData = { email: user.email, id: user.id }
  return data
}

export default function Index() {
  const user = useLoaderData() as LoaderData

  return (
    <header className="p-3 text-bg-dark">
      <nav className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-md-0 me-md-2 text-white text-decoration-none"
          >
            Note App
          </a>

          <ul className="nav col-12 col-md-auto me-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link px-2 text-secondary'
                    : 'nav-link px-2 text-white'
                }
              >
                Home
              </NavLink>
            </li>

            {user && (
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link px-2 text-white">
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>

          {user ? (
            <Form action="/logout" method="post">
              <button className="btn btn-danger" type="submit">
                Logout
              </button>
            </Form>
          ) : (
            <div className="text-end">
              <Link to="login">
                <button
                  type="button"
                  className="btn btn-outline-light me-2"
                  id="login-link-btn"
                >
                  Login
                </button>
              </Link>

              <Link to="sign-up">
                <button
                  type="button"
                  className="btn btn-warning"
                  id="sign-link-btn"
                >
                  Sign-up
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
