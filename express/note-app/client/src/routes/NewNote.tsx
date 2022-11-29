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
    tags: string[] | undefined
  }
  fields?: {
    title: string
    body: string
    tags: string[]
  }
}

type LoaderData = {
  tags: Tag[]
}

function validateLength(data: string) {
  if (data.length < 6) return 'At least 6 charachters!'
}
function validateTags(tagsId: string[]) {
  if (tagsId.length === 0) return 'Please select one tag'
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const title = formData.get('title')
  const body = formData.get('body')
  const labelsId = formData.getAll('tags') as string[]

  // Tags
  const tagRes = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const tagsFromDB: Tag[] = await tagRes.json()
  const newLabels = labelsId.filter((id) => {
    const labelsIdFromDB = tagsFromDB.map((tag) => tag._id)
    return !labelsIdFromDB.includes(id)
  })

  // Add saved tagsId to Note
  const savedTagsId = labelsId.filter((id) =>
    tagsFromDB.map((tag) => tag._id).includes(id)
  )
  const noteTagsIds = [...savedTagsId]

  // Create new tags
  if (newLabels.length > 0) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: newLabels,
      }),
    })
    const newTagsId = await res.json()
    // Add new tags id to note
    noteTagsIds.push(...newTagsId)
  }

  // Note
  if (typeof title !== 'string' || typeof body !== 'string') {
    return { formError: 'Form not submitet properly!' } as ActionData
  }

  const fieldErrors = {
    title: validateLength(title),
    body: validateLength(body),
    tags: validateTags(noteTagsIds),
  }
  const fields = { title, body, tags: noteTagsIds }

  if (Object.values(fieldErrors).some(Boolean)) {
    return { fieldErrors, fields } as ActionData
  }

  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/notes/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, tags: noteTagsIds }),
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
