import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createUser, User } from '../api'
import Spinner from './Spinner'

export default function UserForm({}) {
  const [userName, setUserName] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation(createUser, {
    onSuccess: (data: User) => {
      queryClient.setQueryData('users', (old: User[] | undefined) => {
        if (!old) return []
        old.push(data)
        return old
      })
    },
  })

  async function handleCreateUser() {
    if (userName.trim() === '') return

    mutation.mutate(userName)
    setUserName('')
  }

  return (
    <>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault()
          handleCreateUser()
        }}
      >
        <input
          type="text"
          className="block w-full rounded px-2 py-1
          bg-white border border-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <button
          type="submit"
          className="d-flex align-center gap-1"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <Spinner />
          ) : (
            <svg className="bi">
              <use xlinkHref="#icon-check" />
            </svg>
          )}
          Save
        </button>
      </form>

      {mutation.isError && <p>Error while saving user.</p>}
    </>
  )
}
