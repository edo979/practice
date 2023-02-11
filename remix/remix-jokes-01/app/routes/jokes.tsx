import { json, LinksFunction, LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import Header from '~/components/header'
import { getUser } from '~/utils/session.server'

import jokesStyle from '~/style/jokes.css'
import { db } from '~/utils/db.server'

type LoaderData = {
  jokes: { id: string; name: string }[]
  user: {
    id: string
    username: string
  } | null
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: jokesStyle }]
}

export const loader: LoaderFunction = async ({ request }) => {
  const jokes = await db.joke.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true },
  })

  const user = await getUser(request)

  const data = { jokes, user }
  return json<LoaderData>(data)
}

export default function Index() {
  const { jokes, user } = useLoaderData<LoaderData>()

  return (
    <div className="container">
      <Header user={user} />

      <main>
        <div className="row">
          <div className="col col-md-4 p-3 text-bg-light">
            <h1 className="display-6 text-center border-bottom pb-2">Jokes</h1>
            <nav
              className="list-group | jokes-list"
              aria-label="jokes navigation"
            >
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
            {user && (
              <Link to="new" className="btn btn-warning mt-3 w-100">
                Create New Joke
              </Link>
            )}
          </div>

          <div className="col-12 col-md-8 col-lg-5 d-grid mx-auto p-4">
            <Outlet />
          </div>
        </div>
      </main>
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
