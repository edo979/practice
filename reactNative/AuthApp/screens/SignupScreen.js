import { useContext, useState } from 'react'
import { Alert } from 'react-native'
import AuthContent from '../components/Auth/AuthContent'
import { createUser } from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { AuthContext } from '../store/auth-context'

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const { authenticate } = useContext(AuthContext)

  async function singupHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password)
      authenticate(token)
    } catch (error) {
      Alert.alert(
        'Authentication falied!',
        'Could not create user, please check your inputs data.'
      )
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) return <LoadingOverlay message="Creating user" />

  return <AuthContent onAuthenticate={singupHandler} />
}

export default SignupScreen
