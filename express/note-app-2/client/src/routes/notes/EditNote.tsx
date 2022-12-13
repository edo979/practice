import { useState } from 'react'
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from 'react-router-dom'
import Select from 'react-select'
import { validateField } from './NewNote'
import { Note } from './NotesList'

type ActionData = {
  formError?: string
  formFieldsError?: {
    title?: string
    body?: string
    tags?: string
  }
  formFields?: {
    title: string
    body: string
    tags: string[]
  }
}

type LoaderData = {
  note: Note
  tags: [{ label: string }]
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const { title, body } = Object.fromEntries(formData)
  const tagsRaw = formData.getAll('tags') as unknown as string[]
  const tags = tagsRaw.filter((tag) => tag.trim().length > 0)

  if (typeof title !== 'string' || typeof body !== 'string')
    return { formError: 'Form submitet wrong' } as ActionData

  const formFields = { body, title, tags }
  const formFieldsError = {
    title: validateField(title),
    body: validateField(body),
    tags: tags.length === 0 ? 'Select tag' : undefined,
  }
  if (Object.values(formFieldsError).some(Boolean))
    return { formFields, formFieldsError }

  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/user/notes/${params.noteId}`,
    {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, tags }),
    }
  )
  if (!res.ok) {
    if (res.status === 401) throw new Error('That note is not yours.')
    if (res.status === 403) return redirect('/login')
    if (res.status >= 500) throw new Error('Server Error')
  }

  return redirect('/user/dashboard')
}

export const loader: LoaderFunction = async ({ params }) => {
  const noteId = params.noteId
  if (!noteId) throw new Error("That note doesn't exist!")

  const data = await Promise.all([
    fetch(`${import.meta.env.VITE_SERVER_URI}/user/notes/${noteId}`, {
      method: 'GET',
      credentials: 'include',
    }),
    fetch(`${import.meta.env.VITE_SERVER_URI}/tags`),
  ])

  if (data[0].status === 401) throw new Error('That note is not yours.')
  if (data[0].status >= 403) return redirect('/login')
  const dataJson = await Promise.all([data[0].json(), data[1].json()])

  const [note, { tags }] = dataJson
  return { note, tags }
}

export default function EditNote() {
  const { note, tags } = useLoaderData() as LoaderData
  const error = useActionData() as ActionData
  const [selectedTags, setSelectedTags] = useState(note.tags)

  return (
    <Form className="row" method="post">
      <h1>Edit note:</h1>
      <div className="col-12 col-sm-6">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Note Title..."
          className={`form-control ${
            error?.formFieldsError?.title ? 'is-invalid' : ''
          }`}
          aria-describedby="titleFeedback"
          defaultValue={error?.formFields?.title || note.title}
        />
        <div id="titleFeedback" className="invalid-feedback">
          {error?.formFieldsError?.title}
        </div>
      </div>

      <div className="col-12 col-sm-6">
        <label htmlFor="tags" className="form-label">
          Tags:
        </label>
        <Select
          isMulti
          id="tags"
          name="tags"
          options={tags.map((tag) => ({
            value: tag.label,
            label: tag.label,
          }))}
          defaultValue={selectedTags.map((tag) => ({
            value: tag.label,
            label: tag.label,
          }))}
        />
        {error?.formFieldsError?.tags && (
          <p className="invalid-feedback d-block">
            {error.formFieldsError.tags}
          </p>
        )}
      </div>

      <div className="col-12 mt-2">
        <label htmlFor="body" className="form-label">
          Note Text:
        </label>
        <textarea
          name="body"
          id="body"
          rows={10}
          className={`form-control ${
            error?.formFieldsError?.body ? 'is-invalid' : ''
          }`}
          placeholder="Input Note text here ..."
          aria-describedby="bodyFeedback"
          defaultValue={error?.formFields?.body || note.body}
        />
        <div id="bodyFeedback" className="invalid-feedback">
          {error?.formFieldsError?.body}
        </div>
      </div>

      {error?.formError && (
        <i className="invalid-feedback d-block text-end">{error.formError}</i>
      )}
      <div className="col-12 my-2">
        <div className="hstack gap-2 justify-content-end">
          <Link to="..">
            <button className="btn btn-secondary">Back</button>
          </Link>

          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </div>
    </Form>
  )
}
