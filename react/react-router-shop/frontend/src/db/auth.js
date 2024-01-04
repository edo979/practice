import { createUserWithEmailAndPassword } from 'firebase/auth'
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
