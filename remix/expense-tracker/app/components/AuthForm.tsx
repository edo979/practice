import { Link, useSearchParams } from '@remix-run/react'

export default function AuthForm() {
  const [searchParams] = useSearchParams()
  const authMode = searchParams.get('mode') || 'login'
  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User'
  const toggleBtnCaption =
    authMode === 'login' ? 'Create User' : 'Login with existing user'

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            Welcome to expense tracker app
          </h1>
          <p className="col-lg-10 fs-4">
            Please enter your email address and password to the form and you
            will be redirect to your profile. You don't have an account? Please
            select "Create User" to create a new account, after creating account
            you will be redirect to your profile.
          </p>
        </div>

        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            {authMode === 'sign-up' && (
              <div className="form-floating mb-3">
                <input
                  type="password1"
                  name="password1"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Confirm Password"
                />
                <label htmlFor="floatingPassword">Confirm Password</label>
              </div>
            )}

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              {submitBtnCaption}
            </button>

            <div className="mt-3 text-center">
              <p className="mb-0">- or -</p>
              <b>
                <Link
                  to={authMode === 'login' ? '?mode=sign-up' : '?mode=login'}
                >
                  {toggleBtnCaption}
                </Link>
              </b>
            </div>

            {authMode === 'sign-up' && (
              <>
                <hr className="my-4" />
                <small className="text-body-secondary">
                  By clicking Sign up, you agree to the terms of use.
                </small>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
