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

const getUserColl = firestore.collection('expensesApp')

export async function saveUser({ email, password }: UserDataT) {
  const snap = await getUserColl.where('email', '==', email).get()

  if (!snap.empty)
    throw {
      error: 'User with that email already exists!',
      email: 'Please change email.',
    }

  try {
    const docRef = await getUserColl.add({
      email,
      password: await bcrypt.hash(password, 8),
      limit: 0,
      total: 0,
    })

    return docRef.id
  } catch (error) {
    throw { error: 'Server error!' }
  }
}

export async function getUser({ email, password }: UserDataT) {
  const snap = await getUserColl.where('email', '==', email).get()

  if (snap.empty) return null

  try {
    const docRef = snap.docs[0]
    if (await bcrypt.compare(password, docRef.data().password)) return docRef.id

    return null
  } catch (error) {
    throw { error: 'Server error!' }
  }
}
