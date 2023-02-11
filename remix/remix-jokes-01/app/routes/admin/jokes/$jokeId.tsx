import { Joke } from '@prisma/client'
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node'
import {
  Form,
  Link,
  useActionData,
  useCatch,
  useLoaderData,
  useTransition,
} from '@remix-run/react'
import classNames from 'classnames'
import { db } from '~/utils/db.server'
import { requireUserId } from '~/utils/session.server'

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

type LoaderData = {
  joke: Joke | null
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

const getJoke = async (userId: string, jokeId: string | undefined) => {
  const joke = await db.joke.findUnique({
    where: { id: jokeId },
    select: { id: true, jokesterId: true },
  })

  if (!joke) {
    throw new Response('Cant delete what does not exist', { status: 404 })
  }
  if (joke.jokesterId !== userId) {
    throw new Response('Can not delete other people joke', { status: 401 })
  }

  return { jokeId: joke.id }
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const userId = await requireUserId(request)
  const paginationPage = new URL(request.url).searchParams.get('page') ?? '0'

  // Delete
  if (formData.get('_method') === 'delete') {
    const { jokeId } = await getJoke(userId, params.jokeId)

    await db.joke.delete({ where: { id: jokeId } })

    return redirect('/admin/jokes')
  }

  // Edit
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

  const { jokeId } = await getJoke(userId, params.jokeId)

  await db.joke.update({ where: { id: jokeId }, data: { name, content } })

  const searchParams = new URLSearchParams([['page', paginationPage]])
  return redirect(`/admin/jokes?${searchParams}`)
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const jokeId = params.jokeId
  const joke = await db.joke.findFirst({ where: { id: jokeId } })
  if (!joke) throw new Error('Joke not found')

  const data = { joke }
  return json<LoaderData>(data)
}

export default function AdminEditJokeRoute() {
  const transition = useTransition()
  const actionData = useActionData<ActionData>()
  const { joke } = useLoaderData<LoaderData>()

  return (
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
        defaultValue={actionData?.fields?.name ?? joke?.name}
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
        defaultValue={actionData?.fields?.content ?? joke?.content}
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
            transition.state === 'submitting' || transition.state === 'loading'
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
  )
}

export function ErrorBoundary() {
  return (
    <div className="alert alert-danger align-self-start">
      Something unexpected went wrong while loading joke. Sorry about that.
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 400) {
    return (
      <div className="alert alert-danger align-self-start" role="alert">
        <h4 className="alert-heading">Nice try!!!</h4>
        <p>What you're trying to do is not allowed.</p>
        <hr />
        <Link to="/login" className="btn btn-warning px-4">
          Login
        </Link>
      </div>
    )
  }

  if (caught.status === 401) {
    return (
      <div className="alert alert-danger align-self-start" role="alert">
        <h4 className="alert-heading">Nice try!!!</h4>
        <p>You most be logedin for this action!</p>
        <hr />
        <Link to="/login" className="btn btn-warning px-4">
          Login
        </Link>
      </div>
    )
  }

  if (caught.status === 404) {
    return (
      <div className="alert alert-danger align-self-start" role="alert">
        <h4 className="alert-heading">Not Found!!!</h4>
        <p>That joke does not exist!</p>
        <hr />
      </div>
    )
  }
}
