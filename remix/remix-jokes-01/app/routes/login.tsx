import { ActionFunction, json } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import classNames from 'classnames'

type ActionData = {
  formError?: string
  fieldErrors?: {
    username: string | undefined
    password: string | undefined
  }
  fields?: {
    username: string
    password: string
  }
}

function validateUsername(username: unknown) {
  if (typeof username !== 'string' || username.length < 3)
    return `Usernames must be at least 3 characters long`
}

function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 6)
    return `passwords must be at least 6 characters long`
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  if (typeof username !== 'string' || typeof password !== 'string') {
    return badRequest({ formError: 'Form not submittet correctly' })
  }

  const fields = { username, password }
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields })

  return badRequest({})
}

export default function Login() {
  const actionData = useActionData<ActionData>()
  console.log(actionData)

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form method="post">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className={classNames('form-control', {
                  'is-invalid': actionData?.fieldErrors?.username,
                })}
                id="username"
                name="username"
                defaultValue={actionData?.fields?.username}
                aria-describedby="validationUsernameFeedback"
              />
              <div className="invalid-feedback" id="validationUsernameFeedback">
                {actionData?.fieldErrors?.username}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={classNames('form-control', {
                  'is-invalid': actionData?.fieldErrors?.password,
                })}
                id="password"
                name="password"
                defaultValue={actionData?.fields?.password}
                aria-describedby="validationPasswordFeedback"
              />
              <div className="invalid-feedback" id="validationPasswordFeedback">
                {actionData?.fieldErrors?.password}
              </div>
            </div>

            {actionData?.formError && (
              <div className="invalid-feedback d-block">
                {actionData?.formError}
              </div>
            )}
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
