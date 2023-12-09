import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/userContext.jsx'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, userId } = useUserContext()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signIn({ email, password })
    navigate(`/auth/${userId}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignIn
