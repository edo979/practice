import { useQuery } from 'react-query'
import { getUsers } from './api'
import List from './components/List'
import UserForm from './components/UserForm'
import './styles/style.css'

export default function Users() {
  const usersQuery = useQuery('users', getUsers)

  console.log('User comp is rendered')

  return (
    <div>
      <p>
        Total:{' '}
        {usersQuery.isLoading ? (
          <span>loading...</span>
        ) : (
          <span>
            <b>{usersQuery.data?.length}</b> users.
          </span>
        )}
      </p>

      <UserForm />

      <h2>Users:</h2>
      <List />
    </div>
  )
}
