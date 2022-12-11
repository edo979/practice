import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  useActionData,
  useLoaderData,
} from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { Tag } from './NotesList'

type LoaderData = {
  tags: Tag[]
}

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

const validateField = (fieldValue: string) => {
  if (fieldValue.length < 6) return 'More than 6 letters, please'
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData) as {
    [k: string]: string | string[]
  }
  data.tags = formData.getAll('tags') as string[]
  data.tags = data.tags.filter((tag) => tag !== '')

  const { title, body, tags } = data

  if (
    typeof title !== 'string' ||
    typeof body !== 'string' ||
    typeof tags !== typeof ['string']
  ) {
    return { formError: 'Form data is wrong.' }
  }

  const formFieldsError = {
    title: validateField(title),
    body: validateField(body),
    tags: tags.length === 0 ? 'Select tag' : undefined,
  }

  if (Object.values(formFieldsError).some(Boolean)) {
    const error = {
      formFieldsError,
      formFields: {
        title,
        body,
        tags,
      },
    }

    return { error } as ActionData
  }

  return {}
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  if (!res.ok) throw new Error("Can't get tags!")
  const { tags } = await res.json()
  return { tags } as LoaderData
}

export default function NewNote() {
  const { tags } = useLoaderData() as LoaderData
  const error = useActionData() as ActionData
  console.log(error)

  return (
    <Form className="row" method="post">
      <h1>New Note:</h1>
      <div className="col-12 col-sm-6">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Note Title..."
          className="form-control"
        />
      </div>

      <div className="col-12 col-sm-6">
        <label htmlFor="tags" className="form-label">
          Tags:
        </label>
        <CreatableSelect
          isMulti
          id="tags"
          name="tags"
          options={tags.map((tag) => ({ value: tag.label, label: tag.label }))}
        />
      </div>

      <div className="col-12 mt-2">
        <label htmlFor="body" className="form-label">
          Note Text:
        </label>
        <textarea
          name="body"
          id="body"
          rows={10}
          className="form-control"
          placeholder="Input Note text here ..."
        />
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
