import { db, auth } from './firebaseInit'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore/lite'

const APPCOLLECTION = 'contactsApp'

const getUserDocRef = (uid) => doc(db, APPCOLLECTION, uid)
const getUserContactsColRef = (uid) =>
  collection(db, APPCOLLECTION, uid, 'contacts')

export const getContacts = async (uid) => {
  try {
    const contactsSnap = await getDocs(getUserContactsColRef(uid))
    const contacts = contactsSnap.docs.map((doc) => ({
      id: doc.id,
      first: doc.get('first'),
      last: doc.get('last'),
    }))

    return contacts
  } catch (error) {
    //console.log(error)
    return false
  }
}

export const getSingleContact = async (uid, docId) => {
  try {
    const docRef = doc(db, APPCOLLECTION, uid, 'contacts', docId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() }

    return null
  } catch (error) {
    return null
  }
}

export const createContact = async (uid) => {
  try {
    const userContactsRef = getUserContactsColRef(uid)
    const userDocRef = getUserDocRef(uid)
    const userDocSnap = await getDoc(userDocRef)
    let contact = null

    if (userDocSnap.exists()) {
      console.log('User collection exist')
      contact = await addContact(userContactsRef)
    } else {
      console.log('User document not exist ')
      await setDoc(userDocRef, {})
      contact = await addContact(userContactsRef)
    }
    return contact
  } catch (error) {
    console.log(error, error.message, error.code)
    return null
  }
}

export const editContact = async (uid, contactId, data) => {
  try {
    const contactRef = doc(db, APPCOLLECTION, uid, 'contacts', contactId)
    const contact = await updateDoc(contactRef, { ...data })

    return contact
  } catch (error) {
    return false
  }
}

const addContact = async (userContactsRef) => {
  return await addDoc(userContactsRef, {
    first: 'No',
    last: 'Name',
    avatar: 'https://placekitten.com/g/200/200',
    twitter: '',
    notes: '',
    favorite: false,
  })
}
