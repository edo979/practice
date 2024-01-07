import { useRouteError } from 'react-router-dom'
import ErrorContent from './ErrorContent'

const ErrorPage = () => {
  const error = useRouteError()

  return <ErrorContent error={error} />
}

export default ErrorPage
