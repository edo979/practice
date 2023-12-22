import { Form, Link, redirect, useActionData } from 'react-router-dom'
import { signInUser } from '../db/users.js'
import '../assets/css/userForms.css'

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  let error = undefined

  const userId = await signInUser({ email, password })
  if (userId) return redirect('/my_contacts')

  error = 'Submitting form error. Please try again.'

  return { email, password, error }
}

const SignIn = () => {
  const actionData = useActionData()

  return (
    <div
      className="d-flex align-items-center py-4 bg-body-tertiary"
      style={{ height: '100vh' }}
    >
      <main className="form-signin w-100 m-auto">
        <Form method="post">
          {actionData?.error && (
            <div className="alert alert-danger" role="error">
              <h4 className="alert-heading">Form error!</h4>
              <hr className="border-danger" />
              <p>{actionData.error}</p>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-baseline">
            <h1 className="h3 mb-3 fw-normal">Please sign in, or...</h1>
            <Link to="/register">
              <button className="btn btn-success btn-sm" type="button">
                Register
              </button>
            </Link>
          </div>
          <div className="form-floating mt-2">
            <input
              type="email"
              name="email"
              id="email"
              required
              className="form-control"
              placeholder="name@example.com"
              defaultValue={actionData?.email}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              name="password"
              id="password"
              required
              className="form-control"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Sign In
          </button>
        </Form>
      </main>
    </div>
  )
}

export default SignIn
