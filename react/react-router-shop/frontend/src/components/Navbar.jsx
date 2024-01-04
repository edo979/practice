import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { setUserObserver } from '../db/auth'

const Navbar = () => {
  const [user, setUser] = useState(null)

  useEffect(
    () =>
      setUserObserver(async (user) => {
        if (user) {
          const idTokenResult = await user.getIdTokenResult()
          const isAdmin = idTokenResult.claims.role === 'admin'

          if (isAdmin) {
            setUser('admin')
          } else {
            setUser('user')
          }
        } else {
          setUser(null)
        }
      }),
    []
  )

  return (
    <nav
      className="navbar navbar-expand-md bg-dark border-bottom border-body p-2 py-sm-3 "
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand fs-3 pt-0">
          🛒 Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            {user === 'admin' ? (
              <li className="nav-item">
                <NavLink to="admin" className="nav-link">
                  Admin
                </NavLink>
              </li>
            ) : user === 'user' ? (
              <li className="nav-item">
                <NavLink to="me" className="nav-link">
                  Profile
                </NavLink>
              </li>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Get In
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="signup" className="dropdown-item">
                      Register
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link to="signin" className="dropdown-item">
                      Sign In
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
