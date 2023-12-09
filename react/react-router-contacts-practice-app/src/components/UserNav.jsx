import { Link } from 'react-router-dom'
import { useUserContext } from '../context/userContext'

const UserNav = () => {
  const { userId, signOut } = useUserContext()

  return (
    <header className="row">
      <div className="d-flex justify-content-center">
        {userId ? (
          <button className="btn btn-danger" onClick={signOut}>
            Sign Out
          </button>
        ) : (
          <div className="d-flex gap-2">
            <Link to="/auth/register">
              <button className="btn btn-success">Register</button>
            </Link>
            <Link to="/auth/signin">
              <button className="btn btn-primary">Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default UserNav