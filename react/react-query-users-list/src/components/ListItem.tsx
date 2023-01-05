import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { updateUser, User } from '../api'

type ListItemProps = {
  user: User
}

export default function ListItem({ user }: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(user.name)
  const queryClient = useQueryClient()
  const mutation = useMutation(updateUser)

  async function editUserName() {
    mutation.mutate(
      { id: user.id, name: userName },
      {
        onSuccess: (data) => {
          queryClient.setQueryData('users', (old: User[] | undefined) => {
            if (!old) return []

            const updatedUsers = old.map((user) => {
              if (user.id === data.id) {
                return { ...user, name: data.name } as User
              }
              return user
            })

            return updatedUsers
          })
          setIsEditing(false)
        },
      }
    )
  }

  return (
    <li className="user-list_item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            readOnly={mutation.isLoading}
          />
          <button
            className="btn btn-icon"
            onClick={editUserName}
            disabled={mutation.isLoading}
          >
            <svg className="bi">
              <use xlinkHref="#icon-check" />
            </svg>
          </button>
        </>
      ) : (
        <>
          <p className="m-0">{user.name}</p>

          <span className="controll-icons">
            <button className="btn btn-icon" onClick={() => setIsEditing(true)}>
              <svg className="bi">
                <use xlinkHref="#icon-edit" />
              </svg>
            </button>

            <button className="btn btn-icon">
              <svg className="bi">
                <use xlinkHref="#icon-delete" />
              </svg>
            </button>
          </span>
        </>
      )}
    </li>
  )
}
