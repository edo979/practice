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

const usersColl = firestore.collection('users')

export async function saveUser({ email, password }: UserDataT) {
  const snap = await usersColl.where('email', '==', email).get()

  if (!snap.empty)
    throw {
      error: 'User with that email already exists!',
      email: 'Please change email.',
    }

  try {
    const docRef = await usersColl.add({
      email,
      password: await bcrypt.hash(password, 8),
    })

    return docRef.id
  } catch (error) {
    throw { error: 'Server error!' }
  }
}

export async function getUser({ email, password }: UserDataT) {
  const snap = await usersColl.where('email', '==', email).get()

  if (snap.empty) return null

  try {
    const docRef = snap.docs[0]
    if (await bcrypt.compare(password, docRef.data().password)) return docRef.id

    return null
  } catch (error) {
    throw { error: 'Server error!' }
  }
}
