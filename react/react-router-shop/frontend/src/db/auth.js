import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from './init'

export const registerUser = async ({ email, password }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    return true
  } catch (error) {
    console.log(error.code, '||', error.message)
    return false
  }
}

export const signInUser = async ({ email, password }) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)

    if (user) return true
    return false
  } catch (error) {
    console.log(error)
    // TODO menage errors
    return false
  }
}

export const getUser = async () => {
  await auth.authStateReady()
  const user = auth.currentUser

  if (user) {
    const idTokenResult = await user.getIdTokenResult()
    const customClaims = idTokenResult.claims

    return {
      uid: user.uid,
      role: customClaims.role === 'admin' ? 'admin' : 'user',
    }
  }

  return null
}
