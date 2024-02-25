import { ActionFunctionArgs } from '@remix-run/node'
import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'
import { dummy_data } from './expenses'
import {
  Expense,
  ExpenseRaw,
  deleteExpense,
  updateExpense,
} from '~/data/firebase.server'
import { validateExpenseInput } from '~/data/validator'

export const loader = () => {
  return dummy_data[0]
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const expenseId = params.id
  if (!expenseId)
    throw new Response("That expense isn't exist!", {
      status: 401,
      statusText: 'Invalid Expense',
    })

  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const expenseData = Object.fromEntries(formData) as ExpenseRaw

    try {
      validateExpenseInput(expenseData)
    } catch (error) {
      return error
    }

    const expense = {
      title: expenseData.title,
      amount: parseFloat(expenseData.amount!),
      date: expenseData.date,
    } as unknown as Omit<Expense, 'id'>

    try {
      await updateExpense(expenseId, expense)
    } catch (error) {
      throw error
    }
  } else if (request.method === 'DELETE') {
    try {
      await deleteExpense(expenseId)
    } catch (error) {
      throw error
    }
    return null
  }
}

export type ExpenseLoaderT = typeof loader

export default function Expense() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  )
}
