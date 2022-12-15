import { number } from 'prop-types'
import { LoaderFunction, useActionData, useLoaderData } from 'react-router'

type LoaderData = {
  notesCount: number
  tagsCount: number
  usersCount: number
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/`)
  const data = await res.json()

  return { ...data } as LoaderData
}

export default function Home() {
  const { notesCount, tagsCount, usersCount } = useLoaderData() as LoaderData

  return (
    <section className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <article className="feature col">
        <div
          className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
          style={{ width: '4rem', height: '4rem', borderRadius: '0.75rem' }}
        >
          <svg
            className="bi"
            width="1em"
            height="1em"
            style={{ verticalAlign: '-0.125em', fill: 'currentColor' }}
          >
            <use xlinkHref="#people-circle"></use>
          </svg>
        </div>
        <h3 className="fs-2">Users</h3>
        <p>
          We have {usersCount} registered users. Paragraph of text beneath the
          heading to explain the heading. We'll add onto it with another
          sentence and probably just keep going until we run out of words.{' '}
        </p>
      </article>

      <article className="feature col">
        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          {/* <svg className="bi" width="1em" height="1em"><use xlink:href="#people-circle"></use></svg> */}
        </div>
        <h3 className="fs-2">Featured title</h3>
        <p>
          Paragraph of text beneath the heading to explain the heading. We'll
          add onto it with another sentence and probably just keep going until
          we run out of words.
        </p>
      </article>

      <article className="feature col">
        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          {/* <svg className="bi" width="1em" height="1em">
              <use xlink:href="#toggles2"></use>
            </svg> */}
        </div>
        <h3 className="fs-2">Featured title</h3>
        <p>
          Paragraph of text beneath the heading to explain the heading. We'll
          add onto it with another sentence and probably just keep going until
          we run out of words.
        </p>
      </article>
    </section>
  )
}
