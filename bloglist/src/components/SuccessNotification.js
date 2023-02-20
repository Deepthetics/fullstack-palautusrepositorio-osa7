import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const SuccessNotification = () => {
  const successMessage = useSelector(state => state.successMessage)
  if (successMessage === null) {
    return null
  }

  return <Alert key='success' variant='success'>{successMessage}</Alert>
}

export default SuccessNotification
