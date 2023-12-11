import { Outlet } from 'react-router-dom'
import { useUserContext } from '../../context/userContext'
import { useEffect, useState } from 'react'

const AuthIndexRoute = () => {
  const { userId } = useUserContext()
  const [user, setUser] = useState()

  useEffect(() => {
    setUser(userId)
  }, [userId])

  return (
    <div>
      <p>Auth</p>
      <p>{user}</p>
      <Outlet />
    </div>
  )
}

export default AuthIndexRoute
