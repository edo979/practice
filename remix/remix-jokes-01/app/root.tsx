import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import classname from 'classnames'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
      integrity:
        'sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi',
      crossOrigin: 'anonymous',
    },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header className="p-3 text-bg-dark">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
              >
                {/* <svg
                  className="bi me-2"
                  width="40"
                  height="32"
                  role="img"
                  aria-label="Bootstrap"
                >
                  <use xlink:href="#bootstrap"></use>
                </svg> */}
              </a>

              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      classname(
                        { 'text-secondary': isActive },
                        { 'text-white': !isActive },
                        'nav-link px-2'
                      )
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/jokes'}
                    className={({ isActive }) =>
                      classname(
                        { 'text-secondary': isActive },
                        { 'text-white': !isActive },
                        'nav-link px-2'
                      )
                    }
                  >
                    Jokes
                  </NavLink>
                </li>
              </ul>

              <form
                className="col-12 col-md-auto mb-3 mb-md-0 me-md-3"
                role="search"
              >
                <input
                  type="search"
                  className="form-control border border-secondary text-bg-dark"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </form>

              <div className="text-end">
                <button type="button" className="btn btn-outline-light me-2">
                  Login
                </button>
                <button type="button" className="btn btn-warning">
                  Sign-up
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="container">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
        <LiveReload />
      </body>
    </html>
  )
}
