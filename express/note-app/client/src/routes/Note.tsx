import { Form, Link, LoaderFunction, useLoaderData } from 'react-router-dom'
import { Note as NoteType } from './Home'
import ReactMarkdown from 'react-markdown'

type LoaderData = {
  note: NoteType
}

export const loader: LoaderFunction = async ({ params }) => {
  const noteId = params.noteId
  if (!noteId) throw new Error('Note not found!')

  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/notes/${noteId}`)

  if (res.status === 404) {
    const { message } = await res.json()
    throw new Error(message)
  }
  if (!res.ok) throw new Error('Error on server, sorry.')

  const note = await res.json()
  return { note }
}

export default function Note() {
  const { note } = useLoaderData() as LoaderData

  return (
    <>
      <div className="row align-items-center mt-4">
        <div className="col">
          <h1>{note.title}</h1>
        </div>

        <div className="col-auto">
          <div className="hstack gap-2">
            <button className="btn btn-primary">Edit</button>
            <Form>
              <button className="btn btn-outline-danger" type="submit">
                Delete
              </button>
            </Form>
            <Link to="..">
              <button className="btn btn-outline-secondary">Back</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <ReactMarkdown children={note.body} />
        </div>
      </div>
    </>
  )
}
