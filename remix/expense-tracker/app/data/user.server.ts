import { firestore } from './firebase.server'
import bcrypt from 'bcrypt'

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

  if (!snap.empty)
    throw {
      error: 'User with that email already exists!',
      email: 'Please change email.',
    }

  try {
    const docRef = await userColl.add({
      email,
      password: await bcrypt.hash(password, 8),
    })

    return docRef.id
  } catch (error) {
    throw { error: 'Server error!' }
  }
}

export async function getUser(data: UserDataT) {
  return 'testuserid'
}
