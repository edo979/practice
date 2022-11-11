import { ActionFunction } from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'
import classNames from 'classnames'

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

export const action: ActionFunction = async ({ request, params }) => {
  const jokeId = params.jokeId
}

export default function AdminEditJokeRoute() {
  let transition = useTransition()
  const actionData = useActionData<ActionData>()

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
