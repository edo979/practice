import { ActionFunction, LinksFunction } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import styles from '~/style/loginPage.css'

type ActionData = {
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

  return {}
}

export default function LoginRoute() {
  const actionData = useActionData() as ActionData
  console.log(actionData?.formError)

  return (
    <main className="form-signin w-100 m-auto">
      <Form method="post">
        <h1 className="h3 mb-3 fw-normal">Please Login</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="name@example.com"
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>

        {/* <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div> */}
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
      </Form>
    </main>
  )
}
