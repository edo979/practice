import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from './init'

export const registerUser = async ({ email, password }) =>
  await createUserWithEmailAndPassword(auth, email, password)

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
  return auth.currentUser
}

export const logoutUser = async () => {
  await auth.authStateReady()
  await signOut(auth)
}

export const setUserObserver = (fn) => onAuthStateChanged(auth, fn)
