import { ActionFunction, Form, redirect, useActionData } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { Note } from './Home'
import classNames from 'classnames'

type ActionData = {
  formError?: string
  fieldErrors?: {
    title: string | undefined
    body: string | undefined
  }
  fields?: {
    title: string
    body: string
  }
}

function validateLength(data: string) {
  if (data.length < 6) return 'At least 6 charachters!'
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const title = formData.get('title')
  const body = formData.get('body')

  if (typeof title !== 'string' || typeof body !== 'string') {
    return { formError: 'Form not submitet properly!' } as ActionData
  }

  const fieldErrors = {
    title: validateLength(title),
    body: validateLength(body),
  }
  const fields = { title, body }

  if (Object.values(fieldErrors).some(Boolean)) {
    return { fieldErrors, fields } as ActionData
  }

  const res = await fetch('http://localhost:5000/notes/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  })

  if (res.status === 403) {
    const { message } = await res.json()
    return { formError: message }
  }

  return redirect('/')
}

export default function NewNote() {
  const errors = useActionData() as ActionData

  return (
    <>
      <div className="row mt-4">
        <h1>Add new Note</h1>
      </div>

      <Form method="post">
        <div className="row row-cols-1 row-cols-sm-2">
          <div className="col">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className={classNames('form-control', {
                'is-invalid': errors?.fieldErrors?.title ? true : false,
              })}
              name="title"
              id="title"
              aria-describedby="title-validation"
              defaultValue={errors?.fields?.title}
            />
            <div className="invalid-feedback" id="title-validation">
              {errors?.fieldErrors?.title}
            </div>
          </div>

          <div className="col">
            <label htmlFor="tags" className="form-label">
              Tags
            </label>
            <CreatableReactSelect name="tags" />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <label className="form-label" htmlFor="body">
              Body
            </label>
            <textarea
              rows={15}
              className={classNames('form-control', {
                'is-invalid': errors?.fieldErrors?.body,
              })}
              name="body"
              aria-describedby="body-validation"
              defaultValue={errors?.fields?.body}
            />
            <div className="invalid-feedback" id="body-validation">
              {errors?.fieldErrors?.body}
            </div>
          </div>
        </div>

        <div className="row mt-2">
          {errors?.formError && (
            <div className="col">
              <i className="text-danger">{errors.formError}</i>
            </div>
          )}

          <div className="col-auto ms-auto">
            <button className="btn btn-primary">Save</button>
            <button className="btn btn-secondary ms-2">Cancel</button>
          </div>
        </div>
      </Form>
    </>
  )
}
