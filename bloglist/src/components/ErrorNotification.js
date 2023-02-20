import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const ErrorNotification = () => {
  const errorMessage = useSelector(state => state.errorMessage)
  if (errorMessage === null) {
    return null
  }

  return <Alert key='danger' variant='danger'>{errorMessage}</Alert>
}

export default ErrorNotification
