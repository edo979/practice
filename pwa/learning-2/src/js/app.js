import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'

async function getPosts() {
  const querySnapshot = await getDocs(collection(db, 'posts'))

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
  })
}

await getPosts()
