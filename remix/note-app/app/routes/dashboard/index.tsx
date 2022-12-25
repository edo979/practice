import { LoaderFunction, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getUser } from '~/sessions.server'

type LoaderData = {
  id: string
  email: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  if (!user) return redirect('/')
  return { id: user.id, email: user.email } as LoaderData
}

export default function DashboardIndexRoute() {
  const user = useLoaderData() as LoaderData

  return (
    <div>
      Dashboard index route
      <h1>{user.email}</h1>
      <Form action="/logout" method="post">
        <button className="btn btn-danger" id="logout-btn" type="submit">
          Logout
        </button>
      </Form>
      <Form action="/dashboard/delete-user" method="post">
        <button className="btn btn-danger" id="delete-user-btn" type="submit">
          Delete Account
        </button>
      </Form>
    </div>
  )
}
