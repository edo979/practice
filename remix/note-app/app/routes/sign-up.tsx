import { LinksFunction } from '@remix-run/node'
import styles from '~/style/loginPage.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function SignUpRoute() {
  return (
    <main className="form-signin w-100 m-auto">
      <form>
        <h1 className="h3 mb-3 fw-normal">Please Sign up</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
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
        <button className="w-100 btn btn-lg btn-warning" type="submit">
          Sign up
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
      </form>
    </main>
  )
}
