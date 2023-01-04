import { useState } from 'react'
import { useQuery } from 'react-query'
import { getUsers, saveUser } from './api'

export default function Users() {
  const { status, data: users = [], error } = useQuery('users', getUsers)
  const [userName, setUserName] = useState('')

  async function addUser() {
    const user = await saveUser(userName)
    if (!user) {
      console.log('Error when saving user')
    }
    setUserName('')
  }

  return (
    <div>
      <p>
        Total: <b>{users?.length}</b> users.
      </p>

      <input
        type="text"
        name="user"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={addUser}>Add user</button>

      <h2>Users:</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
