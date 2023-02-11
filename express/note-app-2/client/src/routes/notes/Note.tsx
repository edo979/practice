import ReactMarkdown from 'react-markdown'
import {
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import { Note as NoteModel } from './NotesList'

type LoaderData = {
  note: NoteModel
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const noteId = params.noteId
  if (!noteId) throw new Error("That note doesn't exist!")

  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/user/notes/${noteId}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  )

  if (!res.ok) {
    if (res.status >= 500) throw new Error('Server Error')
    if (res.status === 404) throw new Error("That note doesn't exist!")
    return redirect('/login')
  }

  const note = await res.json()

  return { note } as LoaderData
}

export default function Note() {
  const { note } = useLoaderData() as LoaderData

  return (
    <article>
      <header className="hstack align-items-center justify-content-between">
        <h1>{note.title}</h1>
        <nav className="hstack gap-1">
          <Link to="..">
            <button className="btn btn-secondary">Back</button>
          </Link>

          <Form
            action="delete"
            method="post"
            onSubmit={(e) => {
              if (!confirm('This note will be deleted.')) e.preventDefault()
            }}
          >
            <input type="hidden" name="noteId" value={note._id} />
            <button className="btn btn-danger" type="submit">
              Delete
            </button>
          </Form>

          <Link to="edit">
            <button className="btn btn-primary">Edit</button>
          </Link>
        </nav>
      </header>
      <aside className="hstack gap-1">
        {note.tags.map((tag) => (
          <span key={tag.label} className="badge bg-primary">
            {tag.label}
          </span>
        ))}
      </aside>
      <main className="mt-4">
        <ReactMarkdown>{note.body}</ReactMarkdown>
      </main>
    </article>
  )
}
