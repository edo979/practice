import { db } from './firebaseInit'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  or,
} from 'firebase/firestore/lite'
import { deleteImageFromStorage } from './storage'

const APPCOLLECTION = 'contactsApp'

const getUserDocRef = (uid) => doc(db, APPCOLLECTION, uid)
const getUserContactsColRef = (uid) =>
  collection(db, APPCOLLECTION, uid, 'contacts')
const getContactRef = (uid, contactId) =>
  `${APPCOLLECTION}/${uid}/contacts/${contactId}`

export const getContacts = async (uid) => {
  try {
    const contactsSnap = await getDocs(getUserContactsColRef(uid))
    const contacts = contactsSnap.docs.map((doc) => ({
      id: doc.id,
      first: doc.get('first'),
      last: doc.get('last'),
      favorite: doc.get('favorite'),
    }))

    return contacts
  } catch (error) {
    return null
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

export const getFilteredContacts = async (uid, searchFor) => {
  try {
    console.log(searchFor)
    const q = query(
      getUserContactsColRef(uid),
      where('first', '>=', searchFor),
      where('first', '<=', searchFor + '\uf8ff')
    )

    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    const contacts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      first: doc.get('first'),
      last: doc.get('last'),
    }))

    return contacts
  } catch (error) {
    console.log(error)
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

  async function addContact(userContactsRef) {
    return await addDoc(userContactsRef, {
      first: 'No',
      last: 'Name',
      avatar: 'https://picsum.photos/200',
      twitter: '',
      notes: '',
      favorite: false,
    })
  }
}

export const editContact = async (uid, contactId, data) => {
  try {
    const contactRef = doc(db, APPCOLLECTION, uid, 'contacts', contactId)
    await updateDoc(contactRef, { ...data })

    return true
  } catch (error) {
    return false
  }
}

export const deleteContact = async (uid, contactId) => {
  try {
    await deleteImageFromStorage(contactId)
    await deleteDoc(doc(db, getContactRef(uid, contactId)))
    return true
  } catch (error) {
    return false
  }
}
