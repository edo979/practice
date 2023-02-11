import { useState } from 'react'

type ActionData = {
  formError?: string
}

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [actionData, setActionData] = useState<ActionData>()

  async function handleSubmit() {
    const res = await fetch('/auth/api/login.json', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      window.location.replace('/auth')
      return null
    }

    const actionData: ActionData = await res.json()
    setActionData(actionData)
  }

  return (
    <div className="container my-16 w-96">
      <h1 className="text-3xl font-bold">Login:</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {actionData?.formError && <p>{actionData.formError}</p>}

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
