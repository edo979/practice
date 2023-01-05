import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteUser, getUsers, updateUser, User } from '../api'
import ListItem from './ListItem'

export default function List() {
  console.log('List is rendered')

  const queryClient = useQueryClient()
  const usersQuery = useQuery('users', getUsers)
  const deleteMutation = useMutation(deleteUser)
  const editMutation = useMutation(updateUser)

  async function handleDeleteUser(id: number) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData('users', (old: User[] | undefined) => {
          if (!old) return []

          return old.filter((oldUser) => oldUser.id !== id)
        })
      },
    })
  }

  async function handleEditUser({
    id,
    userName,
  }: {
    id: number
    userName: string
  }) {
    editMutation.mutate(
      { id, name: userName },
      {
        onSuccess: (data: User) => {
          queryClient.setQueryData('users', (old: User[] | undefined) => {
            if (!old) return []

            const updatedUsers = old.map((user) => {
              if (user.id === data.id) return { ...user, name: data.name }
              return user
            })
            return updatedUsers
          })
        },
      }
    )
  }

  return (
    <div className="container">
      {usersQuery.isLoading && <p>Loading...</p>}
      {usersQuery.isSuccess && (
        <ul className="user-list">
          {usersQuery.data?.map((user) => (
            <ListItem
              user={user}
              key={user.id}
              handleDeleteUser={handleDeleteUser}
              handleEditUser={handleEditUser}
              isLoading={editMutation.isLoading}
            />
          ))}
        </ul>
      )}
      {usersQuery.isError && <p>Sorry, an error is ocured!</p>}
    </div>
  )
}
