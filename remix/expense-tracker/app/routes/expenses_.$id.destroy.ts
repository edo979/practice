import { ActionFunctionArgs } from '@remix-run/node'
import { deleteExpense } from '~/data/firebase.server'

export const action = async ({ params }: ActionFunctionArgs) => {
  const expenseId = params.id

  if (!expenseId)
    throw new Response("That expense isn't exist!", { status: 401 })

  await deleteExpense(expenseId)

  return null
}
