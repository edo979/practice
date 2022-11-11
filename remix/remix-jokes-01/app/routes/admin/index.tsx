import { json, LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getUser } from '~/utils/session.server'

type LoaderData = {
  user: { id: string; username: string } | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)

  return json({ user } as LoaderData)
}

export default function AdminIndexRoute() {
  const { user } = useLoaderData<LoaderData>()

  return (
    <div className="my-4">
      <h3>Welcome {user?.username}</h3>
      <Link to="jokes" className="btn btn-sm btn-outline-secondary">
        Edit jokes
      </Link>
    </div>
  )
}
