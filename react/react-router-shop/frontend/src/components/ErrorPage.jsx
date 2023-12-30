import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div>
      <h1>Sorry Error has happen!</h1>
      <p>{error.code || error.message}</p>
    </div>
  )
}

export default ErrorPage
