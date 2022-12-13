import { useState } from 'react'
import {
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import Select from 'react-select'
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
  const error: ActionData = {}
  const [selectedTags, setSelectedTags] = useState(note.tags)

  return (
    <Form className="row">
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
          defaultValue={error.formFields?.title || note.title}
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
          {error?.formFieldsError?.title}
        </div>
      </div>

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
