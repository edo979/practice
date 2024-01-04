import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from './init'

export const registerUser = async ({ email, password }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    return { user: true }
  } catch (error) {
    if (error.message.includes('email-already-in-use'))
      return { error: 'Email already in use!' }
    return { error: 'Form submitted wrong!' }
  }
}

export const signInUser = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    return { user: true }
  } catch (error) {
    if (error.message.includes('user-not-found'))
      return { error: "User with that email doesn't exists!" }

    return { error: 'Form submitted wrong!' }
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
