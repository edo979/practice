import { useRouteError } from 'react-router-dom'

export default function ComponentErrorPage() {
  const error = useRouteError()

  return (
    <div className="alert alert-danger">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <hr />
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
