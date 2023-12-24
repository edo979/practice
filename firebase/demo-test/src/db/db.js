import { db } from './fireInit'
import { getDocs, query, collection } from 'firebase/firestore'

export const getContacts = async () => {
  try {
    const contactsSnap = await getDocs(query(collection(db, 'contacts')))
    contactsSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
    })
  } catch (error) {
    console.log(error)
    return null
  }
}
