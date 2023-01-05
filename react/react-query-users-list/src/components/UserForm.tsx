import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createUser, User } from '../api'

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

  console.log('User form comp is rendered')

  return (
    <>
      <form
        className="user-form container"
        onSubmit={(e) => {
          e.preventDefault()
          handleCreateUser()
        }}
      >
        <input
          type="text"
          name="user"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <button
          type="submit"
          className="d-flex align-center gap-1"
          disabled={mutation.isLoading}
        >
          <svg className="bi">
            <use xlinkHref="#icon-check" />
          </svg>
          {mutation.isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>

      {mutation.isError && <p>Error while saving user.</p>}
    </>
  )
}
