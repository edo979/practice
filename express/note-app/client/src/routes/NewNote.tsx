import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import classNames from 'classnames'
import { Tag } from './Home'

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

type LoaderData = {
  tags: Tag[]
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

  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/notes/new`, {
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

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const tags = await res.json()

  return { tags } as LoaderData
}

export default function NewNote() {
  const errors = useActionData() as ActionData
  const { tags } = useLoaderData() as LoaderData

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
            <CreatableReactSelect
              name="tags"
              options={tags.map((tag) => ({
                label: tag.label,
                value: tag._id,
              }))}
              isMulti
            />
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
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <Link to="..">
              <button className="btn btn-secondary ms-2">Cancel</button>
            </Link>
          </div>
        </div>
      </Form>
    </>
  )
}
