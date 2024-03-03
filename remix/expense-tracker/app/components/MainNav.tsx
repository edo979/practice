import { Link, NavLink } from '@remix-run/react'

export default function MainNav() {
  const userId = '123'

  return (
    <nav className="navbar navbar-expand-lg shadow-sm bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarTogglerDemo01"
        >
          <Link className="navbar-brand" to="/">
            Expense Tracker
          </Link>
          <ul className="navbar-nav justify-content-center mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="expenses">
                Expenses
              </NavLink>
            </li>
          </ul>
          {!userId ? (
            <Link to="/auth" className="btn btn-secondary">
              Login
            </Link>
          ) : (
            <Link to="/auth" className="btn btn-secondary">
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
