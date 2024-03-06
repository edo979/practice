import admin from 'firebase-admin'
import { firestore } from './firebase.server'

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
}

export type BalanceDetailsT = {
  limit: number
  total: number
}

const getUserTransactionsColl = (userId: string) =>
  firestore.collection(`expensesApp/${userId}/transactions`)

// ****************************************************************
// TRANSACTIONS
// ****************************************************************

export const addTransaction = async (
  userId: string,
  data: Omit<ExpenseT, 'id'>
) => {
  const userDocRef = firestore.collection('expensesApp').doc(userId)
  const tranCollRef = firestore.collection(`expensesApp/${userId}/transactions`)

  try {
    await firestore.runTransaction(async (t) => {
      const doc = await t.get(userDocRef)

      if (!doc.exists) {
        throw new Error('No such user!')
      }

      const totalBalance = doc.data()?.total as number
      t.update(userDocRef, {
        total: data.income
          ? totalBalance + data.amount
          : totalBalance - data.amount,
      })

      const newTranRef = tranCollRef.doc()
      t.set(newTranRef, data)
    })
  } catch (error) {
    throw new Response('Error adding expense!', { status: 500 })
  }
}

export const getAllTransactions = async (userId: string) => {
  try {
    const expensesColRef = getUserTransactionsColl(userId)
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
  try {
    const expensesColRef = getUserTransactionsColl(userId)
    const docRef = expensesColRef.doc(id)
    const docSnap = await docRef.get()

    if (!docSnap.exists)
      throw new Response("Expense doesn't found!", { status: 404 })

    await docRef.update({
      ...data,
      date: admin.firestore.Timestamp.fromDate(data.date),
    })
  } catch (error) {
    throw new Response('Error updating expense!', { status: 500 })
  }
}

export const deleteTransaction = async (userId: string, id: string) => {
  try {
    await getUserTransactionsColl(userId).doc(id).delete()
  } catch (error) {
    throw new Response('Error deleting expense!', { status: 500 })
  }
}

// ****************************************************************
// BALANCE
// ****************************************************************

const userCollRef = firestore.collection('expensesApp')

export const getBalance = async (userId: string) => {
  try {
    const docRef = userCollRef.doc(userId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) throw new Response('No User!', { status: 404 })

    return docSnap.data() as BalanceDetailsT
  } catch (error) {
    throw new Response('Error getting user balance!', { status: 500 })
  }
}

export const updateBalance = async (userId: string, data: BalanceDetailsT) => {
  try {
    const docRef = userCollRef.doc(userId)
    await docRef.update(data)
  } catch (error) {
    throw new Response('Error updating user balance!', { status: 500 })
  }
}
