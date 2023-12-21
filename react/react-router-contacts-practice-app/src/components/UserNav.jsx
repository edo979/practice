import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../db/firebaseInit'

const UserNav = () => {
  const { userId } = useUserContext()
  const navigate = useNavigate()

  const signOutHandler = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <header className="row">
      <div className="d-flex justify-content-end">
        {userId ? (
          <button className="btn btn-dark" onClick={signOutHandler}>
            Sign Out
          </button>
        ) : (
          <div className="d-flex gap-2">
            <Link to="/register">
              <button className="btn btn-success">Register</button>
            </Link>
            <Link to="/signin">
              <button className="btn btn-primary">Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default UserNav
