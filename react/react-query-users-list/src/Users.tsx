import List from './components/List'
import Pagination from './components/Pagination'
import UserCount from './components/UserCount'
import UserForm from './components/UserForm'
import './styles/style.css'

export default function Users() {
  return (
    <main>
      <UserCount />
      <UserForm />

      <List />
      <Pagination />
    </main>
  )
}
