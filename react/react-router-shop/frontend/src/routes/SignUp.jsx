import { Form, redirect, useActionData } from 'react-router-dom'
import { registerUser } from '../db/auth'

export async function action({ request }) {
  const formData = await request.formData()
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const isRegistered = await registerUser(data)

  if (isRegistered) return redirect('/me')

  return { formError: 'Form submitted wrong!' }
}

const SignUp = () => {
  const errors = useActionData()

  return (
    <div className="row align-items-center g-xl-5 h-100">
      <div className="col-lg-7 text-center text-lg-start">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
          Vertically centered hero sign-up form
        </h1>
        <p className="col-lg-10 fs-4">
          Below is an example form built entirely with Bootstrap’s form
          controls. Each required form group has a validation state that can be
          triggered by attempting to submit the form without completing it.
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
            <small className="text-body-secondary">{errors.formError}</small>
          )}
        </Form>
      </div>
    </div>
  )
}

export default SignUp
