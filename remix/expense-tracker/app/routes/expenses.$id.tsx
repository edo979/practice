import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { requireAuthCookie } from '~/auth/auth.server'
import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'
import {
  ExpenseT,
  ExpenseRawT,
  deleteTransaction,
  updateTransaction,
} from '~/data/expense.server'
import { validateExpenseInput } from '~/data/validator'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const expenseId = params.id
  const userId = await requireAuthCookie(request)

  if (!expenseId) return { error: 'Expense not found!' }

  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const expenseData = Object.fromEntries(formData) as ExpenseRawT

    try {
      validateExpenseInput(expenseData)
    } catch (error) {
      return error
    }

    const expense: Omit<ExpenseT, 'id'> = {
      title: expenseData.title!,
      amount: parseFloat(expenseData.amount!),
      date: new Date(expenseData.date!),
    }

    try {
      await updateTransaction(userId, expenseId, expense)
    } catch (error) {
      throw error
    }

    return redirect('..')
  } else if (request.method === 'DELETE') {
    try {
      await deleteTransaction(userId, expenseId)
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
