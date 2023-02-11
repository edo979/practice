import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Header from '~/components/header'
import { db } from '~/utils/db.server'
import { getUser } from '~/utils/session.server'

type LoaderData = {
  jokes: Array<{ id: string; name: string; content: string }>
  user: {
    id: string
    username: string
  } | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const jokes = await db.joke.findMany({
    take: 2,
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, content: true },
  })
  const user = await getUser(request)

  const data: LoaderData = { jokes, user }
  return json(data)
}

export default function Home() {
  const { jokes, user } = useLoaderData<LoaderData>()

  return (
    <div className="container">
      <Header user={user} />

      <main>
        <div className="row my-3">
          <div className="p-5 bg-light rounded-3">
            <div className="container-fluid py-5 ">
              <h1 className="display-5 fw-bold">Welcome to Jokes</h1>
              <p className="col-md-8 fs-4">
                This is veare fun begain. Read and make jokes, dont wory be
                happy. Every day is day for new joke. Please send as new joke
                and read other jokes. Have fun.
              </p>
              <button className="btn btn-primary btn-lg" type="button">
                View Jokes
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h2 className="my-4 pb-2 display-6 border-bottom">New Jokes:</h2>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-bg-dark rounded-3">
              <blockquote className="blockquote">
                <p>{jokes[0].content}</p>
                <footer className="blockquote-footer">
                  Jokes name: <cite title="Source Title">{jokes[0].name}</cite>
                </footer>
              </blockquote>

              <button className="btn btn-outline-light" type="button">
                View Joke
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <blockquote className="blockquote">
                <p>{jokes[1].content}</p>
                <footer className="blockquote-footer">
                  Jokes name: <cite title="Source Title">{jokes[1].name}</cite>
                </footer>
              </blockquote>

              <button className="btn btn-outline-secondary" type="button">
                View Joke
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
