import localforage from 'localforage'

const db = localforage.createInstance({ name: 'expenseTrackerApp' })

export type ExpenseRaw = {
  title: string
  amount: number
}

export const addExpense = async (data: ExpenseRaw) => {
  try {
    // TODO: create better id_s
    await db.setItem(Date.now().toString(), data)
  } catch (error) {
    throw new Error('Failed to add expense!')
  }
}

export const getExpense = async (key: string) => {
  try {
    return await db.getItem(key)
  } catch (error) {
    throw new Error('Failed to get expense!')
  }
}

export const getAllExpenses = async () => {
  try {
    const items: ExpenseRaw[] = []

    await db.iterate((key, value) => {
      const expense = JSON.parse(value)
      items.push(expense as ExpenseRaw)
    })
    return items
  } catch (error) {
    throw new Error('Failed to get expenses!')
  }
}
