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

      <section className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Notes App</h1>
        <article className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
              Primary button
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Secondary
            </button>
          </div>
        </article>
      </section>
    </header>
  )
}
