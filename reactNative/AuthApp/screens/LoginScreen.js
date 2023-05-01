import { useContext, useState } from 'react'
import { Alert } from 'react-native'
import AuthContent from '../components/Auth/AuthContent'
import { login } from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { AuthContext } from '../store/auth-context'

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const { authenticate } = useContext(AuthContext)

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await login(email, password)
      authenticate(token)
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not logged in. Please check your credentials.'
      )
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating)
    return <LoadingOverlay message="Loggin in. Please wait" />

  return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen
