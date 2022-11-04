import { ActionFunction, json, LinksFunction } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import classNames from 'classnames'

import { createUserSession } from '~/utils/session.server'
import stylesUrl from '~/style/login.css'

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

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl },
]

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

  return createUserSession(username, '/jokes')
}

export default function Login() {
  const actionData = useActionData<ActionData>()

  return (
    <div className="container bg-light">
      <div className="row align-items-center" style={{ height: '100vh' }}>
        <form method="post" className="mx-auto">
          <h1 className="h3 mb-3 fw-normal text-center">
            Please login <span className="text-muted fs-4">or register</span>
          </h1>

          <div className="mx-auto mb-2" style={{ width: 'fit-content' }}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Login
              </label>
            </div>

            <div className="form-check form-check-inline me-0">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Register
              </label>
            </div>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className={classNames('form-control', {
                'is-invalid': actionData?.fieldErrors?.username,
              })}
              id="username"
              name="username"
              defaultValue={actionData?.fields?.username}
              aria-describedby="validationUsernameFeedback"
              placeholder="User Name"
            />
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="invalid-feedback" id="validationUsernameFeedback">
              {actionData?.fieldErrors?.username}
            </div>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className={classNames('form-control', {
                'is-invalid': actionData?.fieldErrors?.password,
              })}
              id="password"
              name="password"
              defaultValue={actionData?.fields?.password}
              aria-describedby="validationPasswordFeedback"
              placeholder="Password"
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="invalid-feedback" id="validationPasswordFeedback">
              {actionData?.fieldErrors?.password}
            </div>
          </div>

          {actionData?.formError && (
            <div className="invalid-feedback d-block">
              {actionData?.formError}
            </div>
          )}
          <button className="btn btn-primary btn-lg w-100 mt-3" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
