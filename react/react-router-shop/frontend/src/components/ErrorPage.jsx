import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  return <div>{error.code || error.message}</div>
}

export default ErrorPage
