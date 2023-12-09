import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../../secret'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const auth = getAuth(app)

export const getContacts = async () => {
  const contactsCol = collection(db, 'contacts')
  const contactSnapshot = await getDocs(contactsCol)
  const contactList = contactSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return contactList
}
