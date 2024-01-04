import { initializeApp } from 'firebase/app'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

const firebaseConfig = {
  projectId: 'demo-app',
  apiKey: 'any',
  authDomain: 'any',
  storageBucket: 'gs://demo-app.appspot.com/',
}

const app = initializeApp(firebaseConfig)

export const functions = getFunctions(app)
connectFunctionsEmulator(functions, '127.0.0.1', 5001)

export const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)

export const storage = getStorage(app)
if (location.hostname === 'localhost') {
  // Point to the Storage emulator running on localhost.
  connectStorageEmulator(storage, '127.0.0.1', 9199)
}

export const auth = getAuth(app)
connectAuthEmulator(auth, 'http://127.0.0.1:9099')
