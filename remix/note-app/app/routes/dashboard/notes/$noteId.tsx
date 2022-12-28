import { ActionFunction, redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { useRef, useState } from 'react'
import { LoaderFunction } from 'react-router'
import { Link } from 'react-router-dom'
import { validateNoteInputField } from '~/formValidaror'
import { checkNoteUser, editNote, getNote } from '~/models/notes.server'
import { getUserId } from '~/sessions.server'

type ActionData =
  | {
      formError?: string
      formFields?: {
        title?: string
        body?: string
      }
      formFieldsError?: {
        title?: string
        body?: string
      }
    }
  | undefined

export const loader: LoaderFunction = async ({ params }) => {
  const noteId = params.noteId
  const note = await getNote(noteId!)

  return note
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response | ActionData> => {
  const formData = await request.formData()
  const title = formData.get('title')
  const body = formData.get('body')

  const userId = await getUserId(request)
  if (!userId) return redirect('/login')

  if (typeof title !== 'string' || typeof body !== 'string')
    return {
      formError: 'Form submitet wrong',
    }

  const formFields = { title, body }
  const formFieldsError = {
    title: validateNoteInputField(title),
    body: validateNoteInputField(body),
  }

  if (Object.values(formFieldsError).some(Boolean))
    return { formFields, formFieldsError }

  const noteId = params.noteId
  if (!noteId) throw new Error('Error reading note')

  const isUserNote = await checkNoteUser({ userId, noteId })
  const note = await editNote(noteId)

  return redirect(`/dashboard/notes/${noteId}`)
}

export default function noteRoute() {
  const note = useLoaderData()
  const [isEditNote, setIsEditNote] = useState(false)
  const actionData = useActionData() as ActionData
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  return (
    <>
      {isEditNote ? (
        <div>
          <Form method="post" className="row mt-4">
            <h2 className="h4 pb-2">Create new note:</h2>

            <div className="col">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                ref={titleRef}
                className={`form-control ${
                  actionData?.formFieldsError?.title ? 'is-invalid' : ''
                }`}
                placeholder="Title"
                aria-label="Title"
                id="title"
                name="title"
                aria-describedby="invalidTitle"
                aria-invalid={
                  actionData?.formFieldsError?.title ? true : undefined
                }
                defaultValue={actionData?.formFields?.title || note.title}
              />
              <div className="invalid-feedback" id="invalidTitle">
                Title is short
              </div>
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
              <textarea
                ref={bodyRef}
                name="body"
                id="body"
                className={`form-control ${
                  actionData?.formFieldsError?.body ? 'is-invalid' : ''
                }`}
                rows={10}
                aria-describedby="invalidBody"
                aria-invalid={
                  actionData?.formFieldsError?.body ? true : undefined
                }
                defaultValue={actionData?.formFields?.body || note.body}
              />
              <div className="invalid-feedback" id="invalidBody">
                Please add more text.
              </div>
            </div>

            <div className="col-12 d-flex justify-content-end align-items-center gap-2 mt-4 ">
              <button
                className="btn btn-secondary"
                id="cancelEditNoteBtn"
                onClick={() => setIsEditNote(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                type="submit"
                id="saveNoteBtn"
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="row">
          <div className="hstack">
            <h2 className="m-0 h4" id="noteTitle">
              {note.title}
            </h2>
            <div className="hstack gap-2 ms-auto">
              <Link to="../..">
                <button className="btn btn-sm btn-outline-secondary">
                  Back
                </button>
              </Link>

              <button
                className="btn btn-sm btn-primary"
                id="editNoteBtn"
                onClick={() => setIsEditNote(true)}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="hstack flex-wrap">
            <i className="badge bg-primary">tag</i>
          </div>

          <div className="col-12 mt-2" id="noteBody">
            {note.body}
          </div>
        </div>
      )}
    </>
  )
}
