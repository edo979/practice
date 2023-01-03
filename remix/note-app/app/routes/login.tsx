import { ActionFunction, LinksFunction } from '@remix-run/node'
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { validateEmail, validatePassword } from '~/formValidaror'
import { checkUserPassword } from '~/models/user.server'
import { createUserSession } from '~/sessions.server'
import styles from '~/style/loginPage.css'
import { safeRedirect } from '~/utils'

export type ActionData = {
  formError?: string
  fieldErrors?: {
    email: string | undefined
    password: string | undefined
  }
  fields?: { email: string; password: string; remember: FormDataEntryValue }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const { email, password, remember, redirectTo } = Object.fromEntries(
    await request.formData()
  )

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string' ||
    (remember ? typeof remember !== 'string' : false)
  ) {
    return { formError: 'Form not submitted correctly' }
  }

  const safeRedirectTo: string = safeRedirect(redirectTo)

  const fields = { email, password, remember }
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields }

  const userId = await checkUserPassword({ email, password })
  if (!userId) return { formError: 'User and Password not match' }

  return await createUserSession({
    request,
    userId,
    remember: remember === 'on' ? true : false,
    redirectTo: safeRedirectTo,
  })
}

export default function LoginRoute() {
  const actionData = useActionData() as ActionData
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'
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
        <h1 className="h3 mb-3 fw-normal">Please Login</h1>

        <div className="form-floating">
          <input
            type="email"
            className={`form-control${
              actionData?.fieldErrors?.email ? ' is-invalid' : ''
            }`}
            name="email"
            id="email"
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
            name="password"
            id="password"
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

        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" id="remember" name="remember" /> Remember me
          </label>
        </div>

        {actionData?.formError && (
          <div
            className="invalid-feedback d-block mt-0 mb-1"
            id="form-error-message"
          >
            <p>{actionData.formError}</p>
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

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>

        <i className="mt-2 d-block">
          Don't have account sign up{' '}
          <Link to="/sign-up" id="a-signUp">
            here.
          </Link>
        </i>
        <i className="d-block">
          Go to{' '}
          <Link to="/" aria-label="go to home page" id="a-home">
            home
          </Link>
        </i>

        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
      </Form>
    </main>
  )
}
