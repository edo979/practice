import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteUser, getUsers, updateUser, User } from '../api'
import ListItem from './ListItem'
import Spinner from './Spinner'

export default function List() {
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
      <div className="w-full flex items-center justify-between gap-2 border-b border-cyan-500">
        <h2 className="mb-2 pl-2 text-2xl font-semibold">Users:</h2>
        {(editMutation.isLoading || deleteMutation.isLoading) && <Spinner />}
      </div>
      {usersQuery.isLoading && <p>Loading...</p>}
      {usersQuery.isSuccess && (
        <ul className="mt-2">
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
