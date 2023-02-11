import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUserId } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const data = await getUserId(request)
  return json(data)
}

export default function Jokes() {
  const data = useLoaderData()

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="fs-4 text-center">
            Welcome to jokes, pik one from the left.
          </h1>
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return (
    <div className="alert alert-danger align-self-start">
      Something unexpected went wrong while deleting user. Sorry about that.
    </div>
  )
}
