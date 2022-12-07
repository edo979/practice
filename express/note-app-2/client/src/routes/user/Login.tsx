import { ActionFunction, Form, redirect } from 'react-router-dom'
import classes from '../../styles/login-form.module.css'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  })

  if (res.ok) return redirect('/')
  return null
}

export default function Login() {
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
            placeholder="name@example.com"
            name="username"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className={`${classes.formControlPassword} form-control`}
            id="floatingPassword"
            placeholder="Password"
            name="password"
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
        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
      </Form>
    </div>
  )
}
