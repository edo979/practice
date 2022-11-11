import { Joke } from '@prisma/client'
import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import JokeComponent from '~/components/joke'
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

export default function AdminJokeRoute() {
  const { jokes } = useLoaderData<LoaderData>()

  return (
    <>
      {jokes.map((joke) => (
        <div key={joke.id} className="col">
          <JokeComponent {...joke} />
        </div>
      ))}
    </>
  )
}
