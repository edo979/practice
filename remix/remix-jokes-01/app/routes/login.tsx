import { ActionFunction, json } from '@remix-run/node'
import { useActionData } from '@remix-run/react'

type ActionData = {
  formError?: string
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  if (typeof username !== 'string' || typeof password !== 'string') {
    return badRequest({ formError: 'Form not submittet correctly' })
  }
  return badRequest({})
}

export default function Login() {
  const actionData = useActionData<ActionData>()
  console.log(actionData)

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form method="post">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className={`form-control ${
                  actionData?.formError && 'is-invalid'
                }`}
                id="username"
                name="username"
                aria-describedby="validationFeedback"
              />
              <div className="invalid-feedback" id="validationFeedback">
                {actionData?.formError}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            {actionData?.formError && (
              <div className="invalid-feedback d-block">
                {actionData?.formError}
              </div>
            )}
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
