import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteUser, getUsers, updateUser, UserT } from '../api'
import ListItem from './ListItem'
import Spinner from './Spinner'

export default function List() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(2)

  const queryClient = useQueryClient()
  const usersQuery = useQuery(['users', limit, page], () =>
    getUsers(limit, page)
  )

  const deleteMutation = useMutation(deleteUser)
  const editMutation = useMutation(updateUser)

  async function handleDeleteUser(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(['users', limit, page])
      },
    })
  }

  async function handleEditUser({
    id,
    userName,
  }: {
    id: string
    userName: string
  }) {
    editMutation.mutate(
      { id, name: userName },
      {
        onSuccess: (data: UserT) => {
          queryClient.setQueryData(['users', limit, page], (old: any) => {
            const users = old.users as UserT[]

            if (!users) return { ...old, users: [] }

            const updatedUsers = users.map((user) => {
              if (user._id === data._id) return { ...user, name: data.name }
              return user
            })

            return { ...old, users: updatedUsers }
          })
        },
      }
    )
  }

  return (
    <section className="mt-4">
      <div className="w-full flex items-center justify-between gap-2 border-b border-cyan-500">
        <h2 className="mb-2 pl-2 text-2xl font-semibold">Users:</h2>
        {(editMutation.isLoading || deleteMutation.isLoading) && <Spinner />}
      </div>
      {usersQuery.isLoading && <p>Loading...</p>}
      {usersQuery.isSuccess && (
        <ul className="mt-2">
          {usersQuery.data?.users.map((user) => (
            <ListItem
              user={user}
              key={user._id}
              handleDeleteUser={handleDeleteUser}
              handleEditUser={handleEditUser}
              isLoading={editMutation.isLoading}
            />
          ))}
        </ul>
      )}
      {usersQuery.isError && <p>Sorry, an error is ocured!</p>}

      <div className="mt-4 flex justify-center items-center gap-2">
        <button className="btn btn-primary" onClick={() => setPage(1)}>
          First
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            setPage((prev) => {
              if (prev === 1) return 1
              return prev - 1
            })
          }
        >
          Prev
        </button>
        {usersQuery.isLoading ? (
          <Spinner />
        ) : (
          <span>
            {usersQuery.data?.currentPage} of {usersQuery.data?.pageTotal}
          </span>
        )}
        <button
          className="btn btn-primary"
          onClick={() =>
            setPage((prev) => {
              const nextPage = prev + 1
              const pageTotal = usersQuery.data?.pageTotal ?? 1
              if (nextPage > pageTotal) return pageTotal
              return nextPage
            })
          }
        >
          Next
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPage(usersQuery.data?.pageTotal || 1)}
        >
          Last
        </button>
      </div>
    </section>
  )
}
