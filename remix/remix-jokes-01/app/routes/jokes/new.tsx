import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node'
import {
  Form,
  Link,
  useActionData,
  useCatch,
  useTransition,
} from '@remix-run/react'
import classNames from 'classnames'
import { db } from '~/utils/db.server'
import { getUserId, requireUserId } from '~/utils/session.server'

type ActionData = {
  formError?: string
  fieldErrors?: {
    name: string | undefined
    content: string | undefined
  }
  fields?: {
    name: string
    content: string
  }
}

const validateJokeName = (jokeName: unknown) => {
  if (typeof jokeName !== 'string' || jokeName.length < 3) {
    return 'Joke name must be at least 3 charachters long'
  }
}
const validateJokeContent = (jokeContent: unknown) => {
  if (typeof jokeContent !== 'string' || jokeContent.length < 10) {
    return 'Joke content must be at least 10 charachters long'
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

// LOADER
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) throw new Response('Unauthorized', { status: 401 })

  return json({})
}

// ACTION
export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const formData = await request.formData()
  const name = formData.get('name')
  const content = formData.get('content')

  if (typeof name !== 'string' || typeof content !== 'string') {
    return badRequest({ formError: 'Form not submittet correctly' })
  }

  const fields = { name, content }
  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  }

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fields, fieldErrors })

  const joke = await db.joke.create({
    data: { jokesterId: userId, name, content },
  })

  return redirect(`/jokes/${joke.id}`)
}

export default function NewJokes() {
  let transition = useTransition()
  const actionData = useActionData<ActionData>()

  return (
    <div className="d-grid align-items-center">
      <Form method="post">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className={classNames('form-control', {
            'is-invalid': actionData?.fieldErrors?.name,
          })}
          id="name"
          name="name"
          defaultValue={actionData?.fields?.name}
          placeholder="Joke name..."
          aria-describedby="invalid-name-feedback"
        />
        <div className="invalid-feedback" id="invalid-name-feedback">
          {actionData?.fieldErrors?.name}
        </div>

        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          rows={6}
          className={classNames('form-control', {
            'is-invalid': actionData?.fieldErrors?.content,
          })}
          id="content"
          name="content"
          defaultValue={actionData?.fields?.content}
          placeholder="New joke..."
          aria-describedby="invalid-content-feedback"
        />
        <div className="invalid-feedback" id="invalid-content-feedback">
          {actionData?.fieldErrors?.content}
        </div>

        <div className="mt-3">
          {actionData?.formError && (
            <div
              className="invalid-feedback d-block text-center mb-1"
              style={{ marginTop: '-10px' }}
            >
              {actionData?.formError}
            </div>
          )}
          <button
            className="btn btn-secondary w-100 px-5"
            disabled={
              transition.state === 'submitting' ||
              transition.state === 'loading'
            }
            type="submit"
          >
            {transition.state === 'submitting'
              ? 'Saving...'
              : transition.state === 'loading'
              ? 'Saved'
              : 'Save'}
          </button>
        </div>
      </Form>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 401) {
    return (
      <div className="alert alert-danger align-self-start" role="alert">
        <h4 className="alert-heading">Nice try!!!</h4>
        <p>You most be logedin to create new joke!</p>
        <hr />
        <Link to="/login" className="btn btn-warning px-4">
          Login
        </Link>
      </div>
    )
  }
}

export function ErrorBoundary() {
  return (
    <div className="alert alert-danger align-self-start">
      Something unexpected went wrong. Sorry about that.
    </div>
  )
}
