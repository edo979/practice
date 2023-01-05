import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getUsers, saveUser } from './api'
import ListItem from './components/ListItem'
import UserForm from './components/UserForm'
import './styles/style.css'

export default function Users() {
  const queryClient = useQueryClient()
  const usersQuery = useQuery('users', getUsers)

  const createUserMutation = useMutation(saveUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })

  async function handleCreateUser(userName: string) {
    if (userName.trim() === '') return
    createUserMutation.mutate(userName)
  }

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

      <UserForm
        handleCreateUser={handleCreateUser}
        isLoading={createUserMutation.isLoading}
      />

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
