import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { requireAuthCookie } from '~/auth/auth.server'
import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'
import { ExpenseT, ExpenseRawT, addTransaction } from '~/data/expense.server'
import { validateExpenseInput } from '~/data/validator'

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireAuthCookie(request)
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

  await addTransaction(userId, expense)

  return redirect('..')
}

export default function ExpenseAdd() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  )
}
