import admin from 'firebase-admin'
import { Timestamp } from 'firebase-admin/firestore'

export type ExpenseRawT = {
  title?: string
  amount?: string
  date?: string
  income?: string
}

export type ExpenseT = {
  id: string
  title: string
  amount: number
  date: Date
  income?: boolean
}

// Initialize Firebase Admin SDK without a service account
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'expense-tracker-app',
    databaseURL: 'http://127.0.0.1:8080',
  })
}

// Get a Firestore instance
const firestore = admin.firestore()
const expensesColRef = firestore.collection('expenses')

// TODO: Delete this
export const getTimestamp = (date: string) =>
  admin.firestore.Timestamp.fromDate(new Date(date))

export const addTransaction = async (data: Omit<ExpenseT, 'id'>) => {
  try {
    await expensesColRef.add({
      ...data,
      date: admin.firestore.Timestamp.fromDate(data.date),
    })
  } catch (error) {
    throw new Response('Error adding expense!', { status: 500 })
  }
}

export const getAllTransactions = async () => {
  try {
    const snapshot = await expensesColRef.orderBy('date', 'asc').get()
    const expenses: ExpenseT[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate() ?? doc.data().date,
        } as ExpenseT)
    )

    return expenses
  } catch (error) {
    throw new Response('Error retrieving your expenses!', {
      status: 500,
    })
  }
}

export const updateTransaction = async (
  id: string,
  data: Omit<ExpenseT, 'id'>
) => {
  const docRef = expensesColRef.doc(id)
  const docSnap = await docRef.get()
  if (!docSnap.exists)
    throw new Response("Expense doesn't found!", { status: 404 })

  try {
    await docRef.update({
      ...data,
      date: admin.firestore.Timestamp.fromDate(data.date),
    })
  } catch (error) {
    throw new Response('Error updating expense!', { status: 500 })
  }
}

export const deleteTransaction = async (id: string) => {
  const docSnap = await expensesColRef.doc(id).get()
  if (!docSnap.exists)
    throw new Response("Expense doesn't found!", { status: 404 })

  try {
    await expensesColRef.doc(id).delete()
  } catch (error) {
    throw new Response('Error deleting expense!', { status: 500 })
  }
}
