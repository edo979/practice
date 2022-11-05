import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUserId } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const data = await getUserId(request)
  return json(data)
}

export default function Jokes() {
  const data = useLoaderData()
  console.log(data)

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Jokes</h1>
          <p>{data}</p>
        </div>
      </div>
    </div>
  )
}
