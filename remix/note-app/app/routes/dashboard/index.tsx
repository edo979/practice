import { LoaderFunction, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getNotesIdAndTitle } from '~/models/notes.server'
import { getUser } from '~/sessions.server'

type LoaderData = {
  notes: {
    id: string
    title: string
    body: string
  }[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  if (!user) return redirect('/')

  const notes = await getNotesIdAndTitle(user.id)
  return { notes } as LoaderData
}

export default function DashboardIndexRoute() {
  const { notes } = useLoaderData() as LoaderData

  return (
    <section>
      <h2 className="h4">Notes:</h2>
      <div
        className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4"
        id="userNoteCards"
      >
        {notes.map((note) => (
          <Link
            to={`notes/${note.id}`}
            key={note.id}
            className="text-decoration-none text-reset"
          >
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.body}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
