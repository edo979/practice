import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from './firebaseInit'

export const registerUser = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    if (userCredential) return true
  } catch (error) {
    // console.log(error.code || error.message)
    return false
  }
}

export const signInUser = async ({ email, password }) => {
  try {
    const authUser = await signInWithEmailAndPassword(auth, email, password)
    return authUser.user.uid
  } catch (error) {
    //console.log(error.code || error.message)
    console.clear()
    return false
  }
}

export const getCurrentUserId = async () => {
  await auth.authStateReady()
  const userId = auth.currentUser?.uid

  return userId
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    return false
  }
}
