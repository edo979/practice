import { FaExclamationTriangle } from 'react-icons/fa'
import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.log(error)

  return (
    <div className="container">
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <FaExclamationTriangle className="text-danger" size="5em" />
        <h1>Error!</h1>
        <p className="lead">Sorry, there was an error</p>
        <i>{error.statusText || error.message}</i>
        <Link to="/" className="btn btn-primary mt-2">
          Go Back
        </Link>
      </div>
    </div>
  )
}
