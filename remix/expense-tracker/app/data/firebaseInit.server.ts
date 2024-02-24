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
