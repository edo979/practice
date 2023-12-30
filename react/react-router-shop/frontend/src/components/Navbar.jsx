import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
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
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
