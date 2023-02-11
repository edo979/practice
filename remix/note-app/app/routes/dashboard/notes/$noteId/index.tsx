import { LoaderFunction } from '@remix-run/node'
import { Form, Link, useCatch, useLoaderData } from '@remix-run/react'
import { checkNoteUser, getNote } from '~/models/notes.server'
import { requireUserId } from '~/sessions.server'

export const loader: LoaderFunction = async ({ params, request }) => {
  const userId = await requireUserId(request)
  const noteId = params.noteId
  if (!noteId) throw new Error('Error reading note')

  const isUserNote = await checkNoteUser({ userId, noteId })
  console.log(isUserNote)
  if (!isUserNote) throw new Response('Is not user note', { status: 403 })

  const note = await getNote(noteId)

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
