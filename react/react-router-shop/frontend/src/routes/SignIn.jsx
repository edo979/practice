import { Form, redirect, useActionData } from 'react-router-dom'
import { registerUser, signInUser } from '../db/auth'

export async function action({ request }) {
  const formData = await request.formData()
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { user, error } = await signInUser(data)

  if (user) return redirect('/me')
  return { formError: error }
}

const SignIn = () => {
  const errors = useActionData()

  return (
    <div className="row align-items-center g-xl-5 h-100">
      <div className="col-lg-7 text-center text-lg-start">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
          Welcome please <i>login</i>.
        </h1>
        <p className="col-lg-10 fs-4">
          Welcome back user. Please input your data to login in our application.
          After you successfully log in you will be redirected to your's profile
          page.
        </p>
        <hr />
        <p>
          No account yet, please register and create one:{' '}
          <a href="/signup" className="btn btn-success">
            Register
          </a>
        </p>
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <Form
          method="post"
          className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
        >
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              name="email"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign up
          </button>
          <hr className="my-4" />
          {errors?.formError && (
            <p className="m-0 text-danger text-center">
              <small>{errors.formError}</small>
            </p>
          )}
        </Form>
      </div>
    </div>
  )
}

export default SignIn
