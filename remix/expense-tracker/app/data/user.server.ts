import { redirect } from '@remix-run/node'
import { firestore } from './firebase.server'

export type UserDataRawT = {
  email?: string
  password?: string
  password1?: string
}

export type UserDataT = {
  email: string
  password: string
}

const userColl = firestore.collection('users')

export async function saveUser({ email, password }: UserDataT) {
  const snap = await userColl.where('email', '==', email).get()

  if (!snap.empty) throw { error: 'User with that email already exists!' }

  try {
    const docRef = await userColl.add({ email, password })
    return docRef.id
  } catch (error) {
    throw { error: 'Server error!' }
  }
}

export async function getUser(data: UserDataT) {
  return 'testuserid'
}
