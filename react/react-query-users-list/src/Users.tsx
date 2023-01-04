import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getUsers, saveUser } from './api'

export default function Users() {
  const [userName, setUserName] = useState('')
  const queryClient = useQueryClient()
  const { status, data: users = [], error } = useQuery('users', getUsers)
  const mutation = useMutation(saveUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })

  async function addUser() {
    mutation.mutate(userName)
    setUserName('')
  }

  return (
    <div>
      <p>
        Total:{' '}
        {status === 'loading' ? (
          <span>loading...</span>
        ) : (
          <span>
            <b>{users?.length}</b> users.
          </span>
        )}
      </p>

      <input
        type="text"
        name="user"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={addUser}>Add user</button>

      <h2>Users:</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && (
        <ul>
          {users?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
