import admin from 'firebase-admin'

// Initialize Firebase Admin SDK without a service account
admin.initializeApp({
  projectId: 'expense-tracker-app',
  databaseURL: 'http://127.0.0.1:8080',
})

// Get a Firestore instance
export const db = admin.firestore()
