import { Form, redirect, useActionData } from 'react-router-dom'
import { registerUser } from '../db/auth'

export async function action({ request }) {
  const formData = await request.formData()

  if (formData.get('password') !== formData.get('password1'))
    return { formError: "Passwords don't match!" }

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { user, error } = await registerUser(data)

  if (user) return redirect('/me')
  return { formError: error }
}

const SignUp = () => {
  const errors = useActionData()

  return (
    <div className="row align-items-center g-xl-5 h-100">
      <div className="col-lg-7 text-center text-lg-start">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
          Welcome new user, please <i>register</i>.
        </h1>
        <p className="col-lg-10 fs-4">
          Welcome to proShop app, here you can create new account. Please enter
          data we ask and you will be redirect to your's profile page.
        </p>
        <hr />
        <p>
          You have account, please login:{' '}
          <a href="/signin" className="btn btn-success">
            Login
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
              required
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
              required
              min="6"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword1"
              name="password1"
              placeholder="Password"
              required
              min="6"
            />
            <label htmlFor="floatingPassword1">Confirm Password</label>
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

export default SignUp
