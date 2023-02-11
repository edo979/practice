import { Joke } from '@prisma/client'
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node'
import { Link, useCatch, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'
import { getUserId, requireUserId } from '~/utils/session.server'

type LoaderData = {
  joke: Joke
  userId?: string | null
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const jokeId = params.jokeId
  const joke = await db.joke.findFirst({ where: { id: jokeId } })
  if (!joke)
    throw new Response('What a joke! Not found.', {
      status: 404,
    })

  const userId = await getUserId(request)

  const data: LoaderData = { joke, userId }
  return json(data)
}

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData()
  if (form.get('_method') !== 'delete') {
    throw new Response(`The method ${form.get('_method')} is not suported`, {
      status: 400,
    })
  }

  const userId = await requireUserId(request)
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
    select: { id: true, jokesterId: true },
  })

  if (!joke) {
    throw new Response('Cant delete what does not exist', { status: 404 })
  }

  if (joke.jokesterId !== userId) {
    throw new Response('Can not delete other people joke', { status: 401 })
  }

  await db.joke.delete({ where: { id: joke.id } })
  return redirect('/jokes')
}

export default function Joke() {
  const { joke, userId } = useLoaderData<LoaderData>()

  return (
    <div
      className="d-grid align-items-center"
      style={{ gridTemplateRows: '1fr auto' }}
    >
      <blockquote className="blockquote">
        <header className="blockquote-footer">
          <cite title="Source Title">{joke.name}</cite>
        </header>
        <p>{joke.content}</p>
      </blockquote>
      {userId && (
        <form
          method="post"
          onSubmit={(e) => {
            if (!confirm('Joke will be delteted. Are you shoure?')) {
              e.preventDefault()
            }
          }}
        >
          <input type="hidden" name="_method" value="delete" />
          <button
            type="submit"
            className="btn btn-danger ms-auto px-4 align-self-start"
          >
            Delete
          </button>
        </form>
      )}
    </div>
  )
}

export function ErrorBoundary() {
  return (
    <div className="alert alert-danger align-self-start">
      There was an error loading this joke!
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
        <p>Taht joke does not exist!</p>
        <hr />
      </div>
    )
  }
}
