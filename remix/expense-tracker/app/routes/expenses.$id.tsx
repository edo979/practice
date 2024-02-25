import { ActionFunctionArgs, redirect } from '@remix-run/node'
import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'
import {
  ExpenseT,
  ExpenseRawT,
  deleteExpense,
  updateExpense,
} from '~/data/firebase.server'
import { validateExpenseInput } from '~/data/validator'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const expenseId = params.id
  if (!expenseId) return { error: 'Expense not found!' }

  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const expenseData = Object.fromEntries(formData) as ExpenseRawT

    try {
      validateExpenseInput(expenseData)
    } catch (error) {
      return error
    }

    const expense = {
      title: expenseData.title,
      amount: parseFloat(expenseData.amount!),
      date: expenseData.date,
    } as unknown as Omit<ExpenseT, 'id'>

    try {
      await updateExpense(expenseId, expense)
    } catch (error) {
      throw error
    }

    return redirect('..')
  } else if (request.method === 'DELETE') {
    try {
      await deleteExpense(expenseId)
    } catch (error) {
      throw error
    }

    return null
  } else {
    return { error: 'Expense not found!' }
  }
}

export default function Expense() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  )
}
