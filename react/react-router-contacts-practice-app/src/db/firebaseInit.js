import { initializeApp } from 'firebase/app'
import { getFirestore, doc, collection, getDocs } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../../secret'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const auth = getAuth(app)

export const getContacts = async (userId) => {
  try {
    const docRef = doc(db, 'contacts', userId)
    const contactsColRef = collection(docRef, 'user_contacts')
    const contactsSnap = await getDocs(contactsColRef)

    console.log(contactsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  } catch (error) {
    console.log(error)
  }

  return []
}
