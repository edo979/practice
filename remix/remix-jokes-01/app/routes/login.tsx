import { ActionFunction, json, LinksFunction } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import classNames from 'classnames'

import { createUserSession, login } from '~/utils/session.server'
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
    loginType: string
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
  const loginType = formData.get('loginType')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof loginType !== 'string'
  ) {
    return badRequest({ formError: 'Form not submittet correctly' })
  }

  const fields = { username, password, loginType }
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields })

  switch (loginType) {
    case 'login':
      const user = await login({ username, password })
      console.log(user)
      if (!user)
        return badRequest({
          fields,
          formError: `Username/Password combination is incorrect`,
        })
      return createUserSession(user.id, '/jokes')

    case 'register':
      console.log(loginType)

    default:
      return createUserSession(username, '/jokes')
  }
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
                name="loginType"
                id="login"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData.fields.loginType === 'login'
                }
              />
              <label className="form-check-label" htmlFor="login">
                Login
              </label>
            </div>

            <div className="form-check form-check-inline me-0">
              <input
                className="form-check-input"
                type="radio"
                name="loginType"
                id="register"
                value="register"
                defaultChecked={actionData?.fields?.loginType === 'register'}
              />
              <label className="form-check-label" htmlFor="register">
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

          <div className="mt-3">
            {actionData?.formError && (
              <div
                className="invalid-feedback d-block text-center mb-1"
                style={{ marginTop: '-10px' }}
              >
                {actionData?.formError}
              </div>
            )}
            <button className="btn btn-primary btn-lg w-100" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
