import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
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

export const getContacts = async (userId) => {
  // try {
  //   const docRef = doc(db, 'contacts', userId)
  //   const contactsColRef = collection(docRef, 'user_contacts')
  //   const contactsSnap = await getDocs(contactsColRef)

  //   console.log(contactsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  // } catch (error) {
  //   console.log(error.code, error.name, error.message)
  // }

  return []
}

export const createContact = async () => {
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
      //console.log('User collection exist')
      await addContact(userContactsRef, { first: 'Edi', last: 'Seli' })
    } else {
      //console.log('User document not exist ')
      await setDoc(userDocRef, {})
      await addContact(userContactsRef, { first: 'Brand', last: 'New' })
    }

    return true
  } catch (error) {
    return false
  }
}

const addContact = async (userContactsRef, data) => {
  await addDoc(userContactsRef, {
    ...data,
  })
}
