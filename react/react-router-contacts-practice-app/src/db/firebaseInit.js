import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { firebaseConfig } from '../../secret'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getContacts = async () => {
  const contactsCol = collection(db, 'contacts')
  const contactSnapshot = await getDocs(contactsCol)
  const contactList = contactSnapshot.docs.map((doc) => doc.data())

  return contactList
}
