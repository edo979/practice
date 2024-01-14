import { useEffect, useState } from 'react'
import { Link, NavLink, useFetcher } from 'react-router-dom'
import { setUserObserver } from '../db/auth'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const cartFetcher = useFetcher()

  useEffect(() => {
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
    })

    if (cartFetcher.state === 'idle' && !cartFetcher.data) {
      cartFetcher.load('/me/cart')
    }
  }, [cartFetcher])

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
              <>
                <li className="nav-item">
                  <NavLink to="me" end className="nav-link">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="me/cart" className="nav-link align-items-lg-end">
                    <div className="position-relative">
                      <span>Cart</span>
                      <small className="ms-1 badge rounded-pill bg-primary">
                        {cartFetcher.data?.items &&
                          cartFetcher.data?.items?.reduce(
                            (acc, curr) => acc + curr.quantity,
                            0
                          )}
                      </small>
                    </div>
                  </NavLink>
                </li>
              </>
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
