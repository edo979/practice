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

export type BalanceDetailsMutationT = {
  limit?: string
  total?: string
  available?: string
}

export type BalanceDetailsT = {
  limit: number
  total: number
  available: number
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
const expensesColRef = firestore.collection(
  'expenseApp/testuserid/transactions'
)
const getUserTransactions = (userId: string) =>
  firestore.collection(`expenseApp/${userId}/transactions`)

// TODO: Delete this
export const getTimestamp = (date: string) =>
  admin.firestore.Timestamp.fromDate(new Date(date))

export const addTransaction = async (
  userId: string,
  data: Omit<ExpenseT, 'id'>
) => {
  try {
    const expensesColRef = getUserTransactions(userId)
    await expensesColRef.add({
      ...data,
      date: admin.firestore.Timestamp.fromDate(data.date),
    })
  } catch (error) {
    throw new Response('Error adding expense!', { status: 500 })
  }
}

export const getAllTransactions = async (userId: string) => {
  try {
    const expensesColRef = getUserTransactions(userId)
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
  userId: string,
  id: string,
  data: Omit<ExpenseT, 'id'>
) => {
  const expensesColRef = getUserTransactions(userId)
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

export const deleteTransaction = async (userId: string, id: string) => {
  const expensesColRef = getUserTransactions(userId)
  const docSnap = await expensesColRef.doc(id).get()

  if (!docSnap.exists)
    throw new Response("Expense doesn't found!", { status: 404 })

  try {
    await expensesColRef.doc(id).delete()
  } catch (error) {
    throw new Response('Error deleting expense!', { status: 500 })
  }
}

// ****************************************************************
// BALANCE
// ****************************************************************
export const getBalance = async (userId: string) => {
  const userColl = firestore.collection(`expenseApp`)
  const docRef = userColl.doc(userId)
  const docSnap = await docRef.get()

  if (!docSnap.exists) throw new Response('No User!', { status: 404 })

  try {
    return docSnap.data() as { current: number; limit: number }
  } catch (error) {
    throw new Response('Error getting user balance!', { status: 500 })
  }
}

export const updateBalance = async (userId: string, data: BalanceDetailsT) => {
  const userColl = firestore.collection(`expenseApp`)
  const docRef = userColl.doc(userId)
  const docSnap = await docRef.get()

  if (!docSnap.exists)
    throw new Response('User data not found!', { status: 404 })

  try {
    await docRef.update(data)
  } catch (error) {
    throw new Response('Error updating user balance!', { status: 500 })
  }
}
