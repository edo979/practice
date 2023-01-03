import { ActionFunction, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { validateNoteInputField } from '~/formValidaror'
import { createNote } from '~/models/notes.server'
import { requireUserId } from '~/sessions.server'

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

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const formData = await request.formData()
  const title = formData.get('title')
  const body = formData.get('body')

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

  const userId = await requireUserId(request)

  const note = await createNote({ userId, title, body })

  return redirect('/dashboard')
}

export default function NewNoteRoute() {
  const errors = useActionData() as ActionData
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (errors?.formFieldsError?.title) {
      titleRef.current?.focus()
    } else if (errors?.formFieldsError?.body) {
      bodyRef.current?.focus()
    }
  }, [errors])

  return (
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
            errors?.formFieldsError?.title ? 'is-invalid' : ''
          }`}
          placeholder="Title"
          aria-label="Title"
          id="title"
          name="title"
          aria-describedby="invalidTitle"
          aria-invalid={errors?.formFieldsError?.title ? true : undefined}
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
            errors?.formFieldsError?.body ? 'is-invalid' : ''
          }`}
          rows={10}
          aria-describedby="invalidBody"
          aria-invalid={errors?.formFieldsError?.body ? true : undefined}
        />
        <div className="invalid-feedback" id="invalidBody">
          Please add more text.
        </div>
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
