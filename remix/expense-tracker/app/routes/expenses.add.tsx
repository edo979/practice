import { ActionFunctionArgs, redirect } from '@remix-run/node'
import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'
import { Expense, ExpenseRaw, addExpense } from '~/data/firebaseInit.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const expenseData = Object.fromEntries(formData) as ExpenseRaw

  await addExpense(expenseData)

  return redirect('..')
}

export default function ExpenseAdd() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  )
}
