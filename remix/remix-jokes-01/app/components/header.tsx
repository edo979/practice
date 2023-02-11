import { json, LoaderFunction } from '@remix-run/node'
import { Link, NavLink, useLoaderData } from '@remix-run/react'
import classname from 'classnames'
import { getUser } from '~/utils/session.server'
import LoginForm from './loginForm'
import UserProfileMenu from './userProfileMenu'

type LoaderData = {
  user: {
    id: string
    username: string
  } | null
}

type HeaderProps = {
  user: { id: string; username: string } | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  const data = { user }
  return json<LoaderData>(data)
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="p-3 text-bg-dark row">
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

        <form className="col-12 col-sm-auto mb-3 mb-sm-0 me-sm-3" role="search">
          <input
            type="search"
            className="form-control border border-secondary text-bg-dark"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        {user ? <UserProfileMenu {...user} /> : <LoginForm />}
      </div>
    </header>
  )
}
