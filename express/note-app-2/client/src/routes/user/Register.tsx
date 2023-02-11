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

  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  })

  if (res.status === 302) return redirect('/user/dashboard')

  const { message } = await res.json()

  return {
    formError: message || 'Server Error, please try again',
    fields: { username },
  } as ActionData
}

export default function Register() {
  const error = useActionData() as ActionData

  return (
    <div className={`${classes.formSigninContainer} w-100 m-auto`}>
      <Form method="post" className={`${classes.formSignin}`}>
        <h1 className="h3 mb-3 fw-normal">Register Form:</h1>

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

        <button className="w-100 btn btn-lg btn-warning" type="submit">
          Register
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
