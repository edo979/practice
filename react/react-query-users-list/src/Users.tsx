import List from './components/List'
import UserCount from './components/UserCount'
import UserForm from './components/UserForm'
import './styles/style.css'

export default function Users() {
  console.log('User comp is rendered')

  return (
    <div>
      <UserCount />
      <UserForm />

      <h2>Users:</h2>
      <List />
    </div>
  )
}
