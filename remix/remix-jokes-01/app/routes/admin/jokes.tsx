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

  const toLocalTime = (dateString: string) => {
    const date = new Date(dateString)
    const dateParts = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ]

    const formatedDateParts = dateParts.map((part) =>
      part < 9 ? `0${part}` : part.toString()
    )

    const [month, day, year, hour, minutes, seconds] = formatedDateParts
    console.log(day)

    return `${day}.${month}.${year} / ${hour}:${minutes}:${seconds}`
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 my-0">
      {jokes.map((joke) => (
        <div key={joke.id} className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{joke.name}</h5>
              <p className="card-text">{joke.content}</p>
            </div>
            <div className="card-footer">
              <div className="vstack">
                <small className="text-muted">
                  Created at: {toLocalTime(joke.createdAt)}
                </small>
                <hr />
                <small className="text-muted">
                  Last update: {toLocalTime(joke.updatedAt)}
                </small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
