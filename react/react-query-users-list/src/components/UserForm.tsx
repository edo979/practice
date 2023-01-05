import { useState } from 'react'

type UserFormProps = {
  handleCreateUser: (userName: string) => void
  isLoading: boolean
}

export default function UserForm({
  handleCreateUser,
  isLoading,
}: UserFormProps) {
  const [userName, setUserName] = useState('')
  console.log('User form comp is rendered')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <input
        type="text"
        name="user"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        onClick={() => {
          handleCreateUser(userName)
          setUserName('')
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}
