import { useRouteError } from 'react-router-dom'

export default function ErrorPage({ errorTitle }) {
  const error = useRouteError()
  //console.error(error)

  return (
    <div id="error-page" className="container">
      <div className="row">
        <div className="col">
          <div className="alert alert-danger" role="alert">
            <h1>{errorTitle}</h1>
            <hr className="border-danger border-2" />
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="fs-5">
              <b>
                <i>{error.statusText || error.message}</i>
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

ErrorPage.defaultProps = {
  errorTitle: 'Oooops an Error!',
}
