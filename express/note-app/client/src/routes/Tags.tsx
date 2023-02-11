import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'
import { Tag } from './Home'

type LoaderData = {
  tags: Tag[]
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const id = formData.get('id')
  const label = formData.get('label')
  const method = request.method

  if (typeof id !== 'string' || id === '')
    throw new Error('Form submited wrong!')

  switch (method) {
    case 'DELETE':
      const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      if (res.status !== 302) {
        throw new Error('Tags not deleted')
      }
      return redirect('/tags')

    case 'PATCH':
      if (typeof label !== 'string' || label === '') {
        throw new Error('Form submited wrong')
      }

      const postRes = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label, id }),
      })
      if (postRes.status !== 302) {
        throw new Error('Tag not update')
      }
      return redirect('/tags')

    default:
      break
  }
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const tags: Tag[] = await res.json()

  return { tags }
}

export default function Tags() {
  const { tags } = useLoaderData() as LoaderData
  const navigation = useNavigation()

  return (
    <div className="row mt-4">
      <div className="hstack">
        <h1>Edit Tags:</h1>
        {navigation.state !== 'idle' && (
          <div className="spinner-border ms-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <Link to=".." className="ms-auto">
          <button className="btn btn-outline-secondary">Back</button>
        </Link>
      </div>

      <div className="col col-sm-6 col-xl-4 mx-auto mt-2">
        <ul className="list-group">
          {tags.map((tag) => (
            <li className="list-group-item hstack gap-2" key={tag._id}>
              <Form className="hstack gap-2" method="patch">
                <input type="hidden" name="id" value={tag._id} />
                <input
                  className="form-control"
                  name="label"
                  defaultValue={tag.label}
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={navigation.state !== 'idle'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    height={12}
                    fill="currentcolor"
                  >
                    <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                </button>
              </Form>
              <Form
                method="delete"
                onSubmit={(e) => {
                  if (!confirm('This tag will be deleted, are you shure?')) {
                    e.preventDefault()
                  }
                }}
              >
                <input type="hidden" name="id" value={tag._id} />
                <button
                  className="btn btn-outline-danger"
                  type="submit"
                  disabled={navigation.state !== 'idle'}
                >
                  &times;
                </button>
              </Form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
