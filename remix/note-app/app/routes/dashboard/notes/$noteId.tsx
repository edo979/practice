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
      <h3 className="col-12">{note.title}</h3>
      <div className="col-12">{note.body}</div>
      <Link to="../..">
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  )
}
