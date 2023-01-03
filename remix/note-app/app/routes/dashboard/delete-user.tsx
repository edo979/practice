import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node'
import { deleteUser } from '~/models/user.server'
import { getUserId } from '~/sessions.server'

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) throw new Error('Must be loged in')
  const isDeleted = await deleteUser(userId)
  if (!isDeleted) throw new Error('Error while deleting user')

  return redirect('/')
}

export const loader: LoaderFunction = async () => {
  return redirect('/dashboard')
}

export function ErrorBoundary() {
  return (
    <div className="alert alert-danger" role="alert">
      <h1>Error:</h1>
      <i>There was an error while deleting user.</i>
    </div>
  )
}
