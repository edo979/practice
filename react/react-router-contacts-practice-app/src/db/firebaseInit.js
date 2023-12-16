import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { firebaseConfig } from '../../secret'

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
connectAuthEmulator(auth, 'http://127.0.0.1:9099')
connectFirestoreEmulator(db, '127.0.0.1', 8080)
