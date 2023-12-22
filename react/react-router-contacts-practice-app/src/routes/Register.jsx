import { Form, Link, redirect, useActionData } from 'react-router-dom'
import { registerUser } from '../db/users'

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  let error = undefined

  const isRegister = await registerUser({ email, password })
  if (isRegister) return redirect('/my_contacts')

  error = 'Submitting form error. Please try another email.'

  return { email, password, error }
}

const Register = () => {
  const actionData = useActionData()

  return (
    <div
      className="d-flex align-items-center py-4 bg-body-tertiary"
      style={{ height: '100vh' }}
    >
      <main className="form-signin w-100 m-auto">
        {actionData?.error && (
          <div className="alert alert-danger" role="error">
            <h4 className="alert-heading">Form error!</h4>
            <hr className="border-danger" />
            <p>{actionData.error}</p>
          </div>
        )}

        <Form method="post">
          <div className="d-flex justify-content-between align-items-baseline">
            <h1 className="h3 mb-3 fw-normal">Register, or...</h1>
            <Link to="/signin">
              <button className="btn btn-success btn-sm" type="button">
                Sign In
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
            Register
          </button>
        </Form>
      </main>
    </div>
  )
}

export default Register
