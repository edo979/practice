import { ActionFunctionArgs, redirect } from '@remix-run/node'
import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'
import {
  ExpenseT,
  ExpenseRawT,
  addExpense,
  getTimestamp,
} from '~/data/firebase.server'
import { validateExpenseInput } from '~/data/validator'

export const action = async ({ request, params }: ActionFunctionArgs) => {
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
    income: expenseData.income === 'true' ? true : false,
  }

  await addExpense(expense)

  return redirect('..')
}

export default function ExpenseAdd() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  )
}
