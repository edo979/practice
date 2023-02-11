import { ActionFunction, Form, redirect, useActionData } from 'react-router-dom'
import classes from '../../styles/login-form.module.css'

type ActionData = {
  formError?: string
  fields: {
    username: string
    password: string
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  if (typeof username !== 'string' || typeof password !== 'string')
    return { formError: 'Form submitet wrong' } as ActionData

  if (password === '' || username === '')
    return { formError: 'Please provide valid data' }

  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  })

  if (res.status === 302) return redirect('/user/dashboard')

  const { errorMessage } = await res.json()

  return {
    formError: errorMessage || 'Server Error, please try again',
    fields: { username },
  } as ActionData
}

export default function Login() {
  const error = useActionData() as ActionData
  return (
    <div className={`${classes.formSigninContainer} w-100 m-auto`}>
      <Form method="post" className={`${classes.formSignin}`}>
        {/* <img class="mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className={`${classes.formFloating} form-floating`}>
          <input
            type="text"
            className={`${classes.formControlEmail} form-control`}
            id="floatingInput"
            placeholder="username"
            name="username"
            defaultValue={error?.fields?.username}
            required
          />
          <label htmlFor="floatingInput">User name</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className={`${classes.formControlPassword} form-control`}
            id="floatingPassword"
            placeholder="Password"
            name="password"
            defaultValue=""
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-warning" type="submit">
          Sign in
        </button>
        {error?.formError && (
          <div>
            <i className="text-danger mt-2">{error.formError}</i>
            <p className="visually-hidden">{error.formError}</p>
          </div>
        )}
        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
      </Form>
    </div>
  )
}
