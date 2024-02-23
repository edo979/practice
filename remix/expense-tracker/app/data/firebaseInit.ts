import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: 'expense-tracker-app',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

connectFirestoreEmulator(db, '127.0.0.1', 8080)
