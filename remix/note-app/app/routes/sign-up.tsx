import { ActionFunction, LinksFunction } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { validateEmail, validatePassword } from '~/formValidaror'
import { createUser } from '~/models/user.server'
import { createUserSession } from '~/sessions.server'
import styles from '~/style/loginPage.css'
import { ActionData } from './login'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const { email, password } = Object.fromEntries(await request.formData())

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { formError: 'Form not submitted correctly' }
  }

  const fields = { email, password }
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields }

  const user = await createUser({ email, password })

  if (!user) return { formError: 'User with that email is registered' }

  return createUserSession({
    request,
    userId: user.id,
    remember: true,
    redirectTo: '/dashboard',
  })
}

export default function SignUpRoute() {
  const actionData = useActionData() as ActionData
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (actionData?.fieldErrors?.email) {
      emailRef.current?.focus()
    } else if (actionData?.fieldErrors?.password) {
      passwordRef.current?.focus()
    }
  }, [actionData])

  return (
    <main className="form-signin w-100 m-auto">
      <Form
        method="post"
        aria-describedby={
          actionData?.formError ? 'form-error-message' : undefined
        }
      >
        <h1 className="h3 mb-3 fw-normal">Please Sign up</h1>

        <div className="form-floating">
          <input
            type="email"
            className={`form-control${
              actionData?.fieldErrors?.email ? ' is-invalid' : ''
            }`}
            id="email"
            name="email"
            ref={emailRef}
            placeholder="name@example.com"
            aria-describedby={
              actionData?.fieldErrors?.email ? 'ivalidEmailMessage' : undefined
            }
            required
          />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className={`form-control${
              actionData?.fieldErrors?.password ? ' is-invalid' : ''
            }`}
            id="password"
            name="password"
            ref={passwordRef}
            placeholder="Password"
            aria-describedby={
              actionData?.fieldErrors?.password
                ? 'ivalidPasswordMessage'
                : undefined
            }
            required
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>

        {actionData?.formError && (
          <div
            id="form-error-message"
            className="invalid-feedback d-block mt-0 mb-1"
          >
            {actionData.formError}
          </div>
        )}

        {actionData?.fieldErrors?.email && (
          <div
            className="invalid-feedback d-block mt-0 mb-1"
            id="ivalidEmailMessage"
          >
            {actionData.fieldErrors.email}
          </div>
        )}
        {actionData?.fieldErrors?.password && (
          <div
            className="invalid-feedback d-block mt-0 mb-1"
            id="ivalidPasswordMessage"
          >
            {actionData.fieldErrors.password}
          </div>
        )}

        <button className="w-100 btn btn-lg btn-warning" type="submit">
          Sign up
        </button>

        <i className="mt-2 d-block">
          Have account, login{' '}
          <Link to="/login" id="a-login">
            here.
          </Link>
        </i>
        <i className="d-block">
          Go to{' '}
          <Link to="/" aria-label="go to home" id="a-home">
            home
          </Link>
        </i>

        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
      </Form>
    </main>
  )
}
