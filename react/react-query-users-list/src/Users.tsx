import List from './components/List'
import Pagination from './components/Pagination'
import UserForm from './components/UserForm'
import './styles/style.css'

export default function Users() {
  return (
    <main>
      <UserForm />

      <List />
      <Pagination />
    </main>
  )
}
