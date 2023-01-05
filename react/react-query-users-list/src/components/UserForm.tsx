import { useState } from 'react'

type UserFormProps = {
  handleCreateUser: (userName: string) => void
  isLoading: boolean
  isError: boolean
}

export default function UserForm({
  handleCreateUser,
  isLoading,
  isError,
}: UserFormProps) {
  const [userName, setUserName] = useState('')
  console.log('User form comp is rendered')

  return (
    <>
      <form
        className="user-form"
        onSubmit={(e) => {
          e.preventDefault()
          handleCreateUser(userName)
          setUserName('')
        }}
      >
        <input
          type="text"
          name="user"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          <svg className="bi">
            <use xlinkHref="#icon-check" />
          </svg>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>

      {isError && <p>Error while saving user.</p>}
    </>
  )
}
