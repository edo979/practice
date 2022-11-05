import { Joke } from '@prisma/client'
import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

type LoaderData = {
  joke: Joke
}

export const loader: LoaderFunction = async ({ params }) => {
  const jokeId = params.jokeId
  const joke = await db.joke.findFirst({ where: { id: jokeId } })
  if (!joke) throw new Error('Joke not found')

  const data: LoaderData = { joke }
  return json(data)
}

export default function Joke() {
  const { joke } = useLoaderData<LoaderData>()

  return (
    <blockquote className="blockquote">
      <header className="blockquote-footer">
        <cite title="Source Title">{joke.name}</cite>
      </header>
      <p>{joke.content}</p>
    </blockquote>
  )
}
