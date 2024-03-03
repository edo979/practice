import { redirect } from '@remix-run/node'
import { firestore } from './firebase.server'

export type UserDataRawT = {
  email?: string
  password?: string
}

export type UserDataT = {
  email: string
  password: string
}

const userColl = firestore.collection('users')

export async function saveUser({ email, password }: UserDataT) {
  const snap = await userColl.where('email', '==', email).get()

  if (!snap.empty) throw { formError: 'User with that email already exists!' }

  const docRef = await userColl.add({ email, password })
  return docRef.id
}

export async function getUser(data: UserDataT) {
  return 'testuserid'
}
