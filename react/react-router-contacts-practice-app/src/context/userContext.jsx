import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut as signFromFirebase,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../db/firebaseInit'

const UserContext = createContext({})

export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
  }, [])

  const register = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log(userCredential.user)
    } catch (error) {
      console.log(error.code || error.message)
    }
  }

  const signIn = async ({ email, password }) => {
    try {
      const authUser = await signInWithEmailAndPassword(auth, email, password)
      return authUser.user.uid
    } catch (error) {
      console.log(error.code || error.message)
    }
  }

  const signOut = async () => {
    try {
      await signFromFirebase(auth)
      setUser(null)
    } catch (error) {
      console.log('An Error')
    }
  }

  return (
    <UserContext.Provider
      value={{ userId: user?.uid, register, signIn, signOut }}
    >
      {children}
    </UserContext.Provider>
  )
}
