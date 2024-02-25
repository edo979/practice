import admin from 'firebase-admin'

export type ExpenseRaw = {
  title?: string
  amount?: string
  date?: string
}

export type Expense = {
  id: string
  title: string
  amount: number
  date: number
}

// Initialize Firebase Admin SDK without a service account
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'expense-tracker-app',
    databaseURL: 'http://127.0.0.1:8080',
  })
}

// Get a Firestore instance
export const firestore = admin.firestore()
const expensesColRef = firestore.collection('expenses')

export const addExpense = async (data: Omit<Expense, 'id'>) => {
  try {
    await expensesColRef.add({ ...data })
  } catch (error) {
    throw new Response('Error adding expense!', { status: 500 })
  }
}

export const getAllExpenses = async () => {
  try {
    const snapshot = await expensesColRef.get()
    const expenses: Expense[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Expense)
    )

    return expenses
  } catch (error) {
    throw new Response("Error while try to get your's expenses!", {
      status: 500,
    })
  }
}

export const updateExpense = async (id: string, data: Omit<Expense, 'id'>) => {
  const docRef = expensesColRef.doc(id)
  const docSnap = await docRef.get()
  if (!docSnap.exists) throw new Response('Expense not found!', { status: 404 })

  try {
    await docRef.update({ ...data })
  } catch (error) {
    throw new Response('Error updating expense!', { status: 500 })
  }
}

export const deleteExpense = async (id: string) => {
  const docSnap = await expensesColRef.doc(id).get()
  if (!docSnap.exists) throw new Response('Expense not found!', { status: 404 })

  try {
    await expensesColRef.doc(id).delete()
  } catch (error) {
    throw new Response('Error deleting expense!', { status: 500 })
  }
}
