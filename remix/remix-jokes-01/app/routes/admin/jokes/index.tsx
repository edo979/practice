import { Joke, prisma } from '@prisma/client'
import { LoaderFunction, json, redirect } from '@remix-run/node'
import {
  Link,
  useLoaderData,
  useParams,
  useSearchParams,
} from '@remix-run/react'
import classNames from 'classnames'
import JokeComponent from '~/components/joke'
import { db } from '~/utils/db.server'
import { requireUserId } from '~/utils/session.server'

type LoaderData = {
  jokes: Joke[]
  paginationData: {
    page: number
    numOfJokesToShow: number
    jokeCount: number
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  // Pagination page
  const page = parseInt(new URL(request.url).searchParams.get('page') ?? '0')
  const numOfJokesToShow = 5

  // Load jokes
  const userId = await requireUserId(request)
  const jokeCount = await db.joke.count({ where: { jokesterId: userId } })
  const getNumberOfPage = Math.ceil(jokeCount / numOfJokesToShow) - 1

  if (page > getNumberOfPage) {
    return redirect(`/admin/jokes?page=${getNumberOfPage}`)
  }
  if (page < 0) {
    return redirect(`/admin/jokes?page=0`)
  }

  const jokes = await db.joke.findMany({
    where: { jokesterId: userId },
    skip: page * numOfJokesToShow,
    take: numOfJokesToShow,
    orderBy: { createdAt: 'desc' },
  })

  const paginationData = { page, numOfJokesToShow, jokeCount }

  return json({ jokes, paginationData } as LoaderData)
}

export default function AdminJokeRoute() {
  const {
    jokes,
    paginationData: { page, numOfJokesToShow, jokeCount },
  } = useLoaderData<LoaderData>()
  const [searchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') ?? '0')

  const numOfPages = Math.ceil(jokeCount / numOfJokesToShow)
  const paginationPages = []
  for (let i = 0; i < numOfPages; i++) {
    paginationPages.push(
      <li className="page-item" key={i}>
        <Link
          to={`.?page=${i}`}
          className={classNames('page-link', { active: currentPage === i })}
          aria-current={currentPage === i ? 'page' : 'false'}
        >
          {i + 1}
        </Link>
      </li>
    )
  }

  const prevPage = () => {
    const toPage = currentPage - 1
    if (toPage < 0) return 0
    return toPage
  }

  const nextPage = () => {
    const toPage = currentPage + 1
    if (toPage >= numOfPages) return numOfPages - 1 // index 0 based
    return toPage
  }

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 my-0">
        {jokes.map((joke) => (
          <div key={joke.id} className="col">
            <JokeComponent {...joke} paginationPage={currentPage} />
          </div>
        ))}
      </div>

      <nav aria-label="Joke pagination">
        <ul className="pagination justify-content-center mt-5">
          <li className="page-item">
            <Link
              to={`.?page=${prevPage()}`}
              className="page-link"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>

          {paginationPages}

          <li className="page-item">
            <Link
              to={`.?page=${nextPage()}`}
              className="page-link"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
