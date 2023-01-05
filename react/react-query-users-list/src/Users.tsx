import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getUsers, saveUser } from './api'
import ListItem from './components/ListItem'
import './styles/style.css'

export default function Users() {
  const [userName, setUserName] = useState('')

  const queryClient = useQueryClient()
  const usersQuery = useQuery('users', getUsers)
  const createUserMutation = useMutation(saveUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })

  async function addUser() {
    if (userName.trim() === '') return

    createUserMutation.mutate(userName)
    setUserName('')
  }

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

      <input
        type="text"
        name="user"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={addUser} disabled={createUserMutation.isLoading}>
        {createUserMutation.status === 'loading' ? 'Saving...' : 'Save'}
      </button>

      {createUserMutation.isError && <p>Error while saving user.</p>}

      <h2>Users:</h2>
      {usersQuery.isLoading && <p>Loading...</p>}
      {usersQuery.isSuccess && (
        <ul className="user-list">
          {usersQuery.data?.map((user) => (
            <ListItem user={user} key={user.id} />
          ))}
        </ul>
      )}
      {usersQuery.isError && <p>Sorry, an error is ocured!</p>}
    </div>
  )
}
