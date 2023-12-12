import { db, auth } from './firebaseInit'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
} from 'firebase/firestore/lite'

const APPCOLLECTION = 'contactsApp'

const getUserDocRef = (uid) => doc(db, APPCOLLECTION, uid)
const getUserContactsColRef = (uid) =>
  collection(db, APPCOLLECTION, uid, 'contacts')

export const getContacts = async () => {
  const currentUser = auth.currentUser

  if (!currentUser) return false

  try {
    const contactsSnap = await getDocs(getUserContactsColRef(currentUser.uid))
    const contacts = contactsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return contacts
  } catch (error) {
    //console.log(error)
    return []
  }
}

export const createContact = async () => {
  const currentUser = auth.currentUser

  if (!currentUser) return false

  try {
    const userContactsRef = getUserContactsColRef(currentUser.uid)
    const userDocRef = getUserDocRef(currentUser.uid)
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
