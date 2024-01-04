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
    // TODO menage errors
    return false
  }
}

export const getUser = async () => {
  await auth.authStateReady()
  return auth.currentUser
}
