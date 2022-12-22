import { ActionFunction, LinksFunction } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { validateEmail, validatePassword } from '~/formValidaror'
import styles from '~/style/loginPage.css'

export type ActionData = {
  formError?: string
  fieldErrors?: { email: string | undefined; password: string | undefined }
  fields?: { email: string; password: string }
}

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

  return {}
}

export default function LoginRoute() {
  const actionData = useActionData() as ActionData

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
            placeholder="name@example.com"
            aria-describedby={
              actionData?.fieldErrors?.email ? 'ivalidEmailMessage' : undefined
            }
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
            placeholder="Password"
            aria-describedby={
              actionData?.fieldErrors?.password
                ? 'ivalidPasswordMessage'
                : undefined
            }
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>

        {actionData?.formError && (
          <div id="form-error-message">
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
        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
      </Form>
    </main>
  )
}
