import { ActionFunctionArgs, redirect } from '@remix-run/node'
import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'
import { Expense, ExpenseRaw, addExpense } from '~/data/firebaseInit.server'
import { validateExpenseInput } from '~/data/validator'

export const action = async ({ request }: ActionFunctionArgs) => {
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
