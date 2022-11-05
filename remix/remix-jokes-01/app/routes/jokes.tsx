import { json, LinksFunction, LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

import jokesStyle from '~/style/jokes.css'
import { db } from '~/utils/db.server'

type LoaderData = {
  jokes: { id: string; name: string }[]
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: jokesStyle }]
}

export const loader: LoaderFunction = async () => {
  const jokes = await db.joke.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true },
  })

  const data = { jokes }
  return json<LoaderData>(data)
}

export default function Index() {
  const { jokes } = useLoaderData<LoaderData>()

  return (
    <div className="row">
      <div className="col col-sm-4 p-3 text-bg-light">
        <h1 className="display-6 text-center border-bottom pb-2">Jokes</h1>
        <nav className="list-group | jokes-list" aria-label="jokes navigation">
          {jokes.map((joke) => (
            <Link
              key={joke.id}
              to={`/jokes/${joke.id}`}
              className="py-3 border-bottom text-decoration-none text-dark fw-bold"
            >
              {joke.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="col col-sm-8">
        <Outlet />
      </div>
    </div>
  )
}
