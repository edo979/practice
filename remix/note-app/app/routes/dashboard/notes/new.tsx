import { ActionFunction, redirect } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import { createNote } from '~/models/notes.server'
import { getUserId } from '~/sessions.server'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const title = formData.get('title') as string
  const body = formData.get('body') as string

  const userId = await getUserId(request)
  if (!userId) return redirect('/')

  const note = await createNote({ userId, title, body })

  return redirect('/dashboard')
}

export default function NewNoteRoute() {
  return (
    <Form method="post" className="row mt-4">
      <h2 className="h4 pb-2">Create new note:</h2>

      <div className="col">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          aria-label="Title"
          id="title"
          name="title"
        />
      </div>

      <div className="col">
        <label htmlFor="tags" className="form-label">
          Tags
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Tags"
          aria-label="Tags"
          id="tags"
          name="tags"
        />
      </div>

      <div className="col-12 mt-4">
        <label htmlFor="body" className="form-label">
          Body
        </label>
        <textarea name="body" id="body" className="form-control" rows={10} />
      </div>

      <div className="col-12 d-flex justify-content-end align-items-center gap-2 mt-4 ">
        <Link to="../.." className="btn btn-secondary">
          Cancel
        </Link>
        <button className="btn btn-success" type="submit" id="saveNoteBtn">
          Save
        </button>
      </div>
    </Form>
  )
}
