import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      console.log(userCredential.user)
    } catch (error) {
      console.log(error.code || error.message)
    }
  }

  const signOut = async () => {
    console.log('not implemented')
  }

  return (
    <UserContext.Provider
      value={{ userId: user.uid, register, signIn, signOut }}
    >
      {children}
    </UserContext.Provider>
  )
}
