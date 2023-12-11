import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  collection,
} from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../../secret'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const appCollection = 'contactsApp'
export const auth = getAuth(app)

export const getContacts = async () => {
  await auth.authStateReady()
  const currentUser = auth.currentUser

  if (!currentUser) return false

  try {
    const userContactsRef = collection(
      db,
      appCollection,
      currentUser.uid,
      'contacts'
    )
    const contactsSnap = await getDocs(userContactsRef)
    const contacts = contactsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return contacts
  } catch (error) {
    return []
  }
}

export const createContact = async () => {
  await auth.authStateReady()
  const currentUser = auth.currentUser

  if (!currentUser) return false

  try {
    const userDocRef = doc(db, appCollection, currentUser.uid)
    const userContactsRef = collection(
      db,
      appCollection,
      currentUser.uid,
      'contacts'
    )
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      console.log('User collection exist')
      await addContact(userContactsRef)
    } else {
      console.log('User document not exist ')
      await setDoc(userDocRef, {})
      await addContact(userContactsRef)
    }

    return true
  } catch (error) {
    console.log(error, error.message, error.code)
    return false
  }
}

const addContact = async (userContactsRef) => {
  await addDoc(userContactsRef, {
    first: 'No',
    last: 'Name',
    avatar: 'https://placekitten.com/g/200/200',
    twitter: '',
    notes: '',
    favorite: false,
  })
}
