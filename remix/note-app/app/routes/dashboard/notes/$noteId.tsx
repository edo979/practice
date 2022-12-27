import { useLoaderData } from '@remix-run/react'
import { LoaderFunction } from 'react-router'
import { Link } from 'react-router-dom'
import { getNote } from '~/models/notes.server'

export const loader: LoaderFunction = async ({ params }) => {
  const noteId = params.noteId
  const note = await getNote(noteId!)

  return note
}

export default function noteRoute() {
  const note = useLoaderData()

  return (
    <div className="row">
      <div className="hstack">
        <h2 className="m-0 h4">{note.title}</h2>
        <div className="hstack gap-2 ms-auto">
          <Link to="../..">
            <button className="btn btn-sm btn-outline-secondary">Back</button>
          </Link>
          <Link to="../..">
            <button className="btn btn-sm btn-primary">Edit</button>
          </Link>
        </div>
      </div>

      <div className="hstack flex-wrap">
        <i className="badge bg-primary">tag</i>
      </div>

      <div className="col-12 mt-2">{note.body}</div>
    </div>
  )
}
