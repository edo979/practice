import { useQuery } from 'react-query'
import { getUsers } from './api'

export default function Users() {
  const { status, data: users = [], error } = useQuery('users', getUsers)
  console.log(users)

  return (
    <div>
      <p>
        Total: <b>{users?.length}</b> users.
      </p>

      <input type="text" name="user" />
      <button>Add user</button>

      <h2>Users:</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
