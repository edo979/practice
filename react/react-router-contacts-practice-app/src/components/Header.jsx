import { useUserContext } from '../context/userContext'

const Header = () => {
  const { userId, signOut } = useUserContext()

  return (
    <header className="row">
      <div className="row">
        <div className="col">Is signIn: {userId}</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </header>
  )
}

export default Header
