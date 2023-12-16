import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../db/users'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = await registerUser({ email, password })

    if (newUser) navigate('/my_contacts')

    // TODO: use action function instead
  }

  return (
    <div
      className="d-flex align-items-center py-4 bg-body-tertiary"
      style={{ height: '100vh' }}
    >
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-baseline">
            <h1 className="h3 mb-3 fw-normal">Register, or...</h1>
            <Link to="/signin">
              <button className="btn btn-success btn-sm" type="button">
                Sign In
              </button>
            </Link>
          </div>
          <div className="form-floating mt-2">
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Register
          </button>
        </form>
      </main>
    </div>
  )
}

export default Register