import { useRouteError } from 'react-router'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div className="vh-100 vw-100 text-bg-dark">
      <div className="container">
        <div className="row">
          <div className="mx-auto col-10 col-lg-6">
            <div className="alert alert-danger mx-auto mt-5" role="alert">
              <h1>Oops!</h1>
              <p>Sorry, an unexpected error has occurred.</p>
              <hr />
              <p>
                <i>{error.statusText || error.message}</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
