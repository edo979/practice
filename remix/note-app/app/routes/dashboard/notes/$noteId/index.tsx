import { LoaderFunction } from '@remix-run/node'
import { Form, Link, useCatch, useLoaderData } from '@remix-run/react'
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
          <Form
            action="delete"
            method="post"
            onSubmit={(e) => {
              if (!confirm('This note will be deleted. Are your shoure?'))
                e.preventDefault()
            }}
          >
            <button className="btn btn-danger btn-sm" id="deleteNoteBtn">
              Delete
            </button>
          </Form>
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

export function CatchBoundary() {
  const caught = useCatch()
  if (caught.status === 403) {
    return (
      <div className="alert alert-danger" role="alert">
        That note is not yours!
      </div>
    )
  }
  throw new Error(`Unhandled error: ${caught.status}`)
}
