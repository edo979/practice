import { useUserContext } from '../context/userContext'

const Header = () => {
  const { userId } = useUserContext()
  console.log(userId)

  return (
    <header className="row">
      <div className="row">
        <div className="col">Is signIn: {userId}</div>
      </div>
    </header>
  )
}

export default Header
