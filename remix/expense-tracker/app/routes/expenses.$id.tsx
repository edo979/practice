import { ActionFunctionArgs } from '@remix-run/node'
import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'
import { dummy_data } from './expenses'
import { deleteExpense } from '~/data/firebase.server'

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

  if (request.method === 'POST') {
  }

  if (request.method === 'DELETE') {
    try {
      await deleteExpense(expenseId)
    } catch (error) {
      console.log(expenseId)
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
