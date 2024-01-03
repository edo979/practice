import { Link, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  console.log(error)
  return (
    <div className="row">
      <div className="mt-3 offset-2 col-8">
        <div className="alert alert-danger shadow-sm">
          <h1 className="alert-heading text-center">Sorry Error has happen!</h1>
          <p>
            <b>{error.message}</b>
          </p>
          {import.meta.env.DEV && (
            <div>
              <p>{error?.data && error.data}</p>
              <p>{error?.error?.stack && error.error.stack}</p>
            </div>
          )}
          <hr />
          <div className="d-flex justify-content-end">
            <Link to={-1} className="btn btn-danger">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
