import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="">
      <nav className="navbar bg-dark navbar-dark">
        <div className="container flex-column flex-sm-row">
          <Link to="/" className="navbar-brand">
            Notes App
          </Link>

          <div>
            <Link to="/register">
              <button className="btn btn-outline-light btn-sm">Register</button>
            </Link>
            <Link to="/login" className="ms-2">
              <button className="btn btn-warning btn-sm">Login</button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
