import { LoaderFunction, redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
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

export default function DashboardRoute() {
  const user = useLoaderData() as LoaderData

  return (
    <div>
      <h1>{user.email}</h1>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
