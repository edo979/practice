import { Joke } from '@prisma/client'
import { json, LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'
import { getUserId } from '~/utils/session.server'

type LoaderData = {
  joke: Joke
  userId?: string | null
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const jokeId = params.jokeId
  const joke = await db.joke.findFirst({ where: { id: jokeId } })
  if (!joke) throw new Error('Joke not found')

  const userId = await getUserId(request)

  const data: LoaderData = { joke, userId }
  return json(data)
}

export default function Joke() {
  const { joke, userId } = useLoaderData<LoaderData>()

  return (
    <div
      className="d-grid align-items-center"
      style={{ gridTemplateRows: '1fr auto' }}
    >
      <blockquote className="blockquote">
        <header className="blockquote-footer">
          <cite title="Source Title">{joke.name}</cite>
        </header>
        <p>{joke.content}</p>
      </blockquote>
      {userId && (
        <Link
          to="delete"
          className="btn btn-danger ms-auto px-4 align-self-start"
        >
          Delete
        </Link>
      )}
    </div>
  )
}
