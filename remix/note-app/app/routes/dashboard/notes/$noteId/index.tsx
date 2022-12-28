import { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getNote } from '~/models/notes.server'

export const loader: LoaderFunction = async ({ params }) => {
  const noteId = params.noteId
  const note = await getNote(noteId!)

  return note
}

export default function SingleNoteRoute() {
  const note = useLoaderData()

  return (
    <>
      <div className="hstack">
        <h2 className="m-0 h4" id="noteTitle">
          {note.title}
        </h2>
        <div className="hstack gap-2 ms-auto">
          <Link to="../..">
            <button className="btn btn-sm btn-outline-secondary">Back</button>
          </Link>
          <Link to={`edit`} className="btn btn-sm btn-primary" id="editNoteBtn">
            Edit
          </Link>
        </div>
      </div>

      <div className="hstack flex-wrap">
        <i className="badge bg-primary">tag</i>
      </div>

      <div className="col-12 mt-2" id="noteBody">
        {note.body}
      </div>
    </>
  )
}
