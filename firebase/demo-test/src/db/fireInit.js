import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const app = initializeApp({
  apiKey: 'any',
  authDomain: 'any',
  projectId: 'demo-test',
  storageBucket: 'any',
  messagingSenderId: 'any',
  appId: 'any',
})

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore()
connectFirestoreEmulator(db, '127.0.0.1', 8080)
