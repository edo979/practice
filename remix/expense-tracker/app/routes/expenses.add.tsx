import { ActionFunctionArgs, redirect } from '@remix-run/node'
import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'
import { ExpenseT, ExpenseRawT, addExpense } from '~/data/firebase.server'
import { validateExpenseInput } from '~/data/validator'

export const action = async ({ request }: ActionFunctionArgs) => {
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
