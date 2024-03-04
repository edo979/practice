import { Form, Link, useActionData, useSearchParams } from '@remix-run/react'
import { useRef, useState } from 'react'
import FormInvalidInputMsg from './FormInvalidInputMsg'

export default function AuthForm() {
  const errors = useActionData() as {
    error: string
    email: string
    password: string
  }

  const [searchParams] = useSearchParams()
  const authMode = searchParams.get('mode') || 'login'
  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User'
  const toggleBtnCaption =
    authMode === 'login' ? 'Create User' : 'Login with existing user'

  const passRef = useRef<HTMLInputElement>(null)
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isPasswordMatch, setIsPasswordMatch] = useState(true)

  const handlePasswordCheck = (value: string) => {
    setPasswordConfirm(value)
    if (value.length >= 6) {
      setIsPasswordMatch(value === passRef.current?.value)
    }
  }

  let errorMessage = ''
  if (errors?.error) errorMessage = errors.error

  if (errors && Object.keys(errors).length)
    errorMessage = 'Form have some errors!'

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
          <Form
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
            method="post"
          >
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Email address</label>
              {errors?.email && <FormInvalidInputMsg error={errors.email} />}
            </div>
            <div className="form-floating mb-3">
              <input
                ref={passRef}
                type="password"
                name="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors?.password && (
                <FormInvalidInputMsg error={errors.password} />
              )}
            </div>

            {authMode === 'sign-up' && (
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => handlePasswordCheck(e.target.value)}
                  type="password"
                  name="password1"
                  className="form-control"
                  id="floatingPassword1"
                  placeholder="Confirm Password"
                />
                <label htmlFor="floatingPassword1">Confirm Password</label>
                {!isPasswordMatch && (
                  <FormInvalidInputMsg error={`Password don't match!`} />
                )}
              </div>
            )}

            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              disabled={passwordConfirm.length > 5 && !isPasswordMatch}
            >
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
          </Form>
        </div>
      </div>
    </div>
  )
}
