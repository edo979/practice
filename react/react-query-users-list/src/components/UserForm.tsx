import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createUser, UserT } from '../api'
import Spinner from './Spinner'

export default function UserForm({}) {
  const [userName, setUserName] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation(createUser)

  async function handleCreateUser() {
    if (userName.trim() === '') return

    mutation.mutate(userName)
    setUserName('')
  }

  return (
    <section className="mt-4">
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          handleCreateUser()
        }}
      >
        <input
          type="text"
          className="form-control"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-inline btn-primary"
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
    </section>
  )
}
