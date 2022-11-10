import { Joke } from '@prisma/client'
import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'
import { requireUserId } from '~/utils/session.server'

type LoaderData = {
  jokes: Joke[]
}
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)

  const jokes = await db.joke.findMany({
    where: { jokesterId: userId },
    take: 5,
    orderBy: { createdAt: 'desc' },
  })

  return json({ jokes } as LoaderData)
}

export default function AdminJokesRoute() {
  const { jokes } = useLoaderData<LoaderData>()

  return (
    <div>
      <h3>Jokes create by You:</h3>

      <ul>
        {jokes.map((joke) => (
          <li key={joke.id}>{joke.name}</li>
        ))}
      </ul>
    </div>
  )
}
