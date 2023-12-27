import { initializeApp } from 'firebase/app'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  projectId: 'demo-app',
}

const app = initializeApp(firebaseConfig)

export const functions = getFunctions(app)
connectFunctionsEmulator(functions, '127.0.0.1', 5001)
export const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)
