import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { deleteUser, updateUser, User } from '../api'

type ListItemProps = {
  user: User
}

export default function ListItem({ user }: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(user.name)
  const queryClient = useQueryClient()
  const editMutation = useMutation(updateUser)
  const deleteMutation = useMutation(deleteUser)

  async function editUserName() {
    editMutation.mutate(
      { id: user.id, name: userName },
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

          setIsEditing(false)
        },
      }
    )
  }

  async function deleteUserFromDb() {
    deleteMutation.mutate(user.id, {
      onSuccess: () => {
        queryClient.setQueryData('users', (old: User[] | undefined) => {
          if (!old) return []

          return old.filter((oldUser) => oldUser.id !== user.id)
        })
      },
    })
  }

  return (
    <li className="user-list_item">
      {isEditing ? (
        <form
          className="d-flex align-center gap-1"
          onSubmit={(e) => {
            e.preventDefault()
            editUserName()
          }}
        >
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            readOnly={editMutation.isLoading}
          />
          <button
            type="submit"
            className="btn btn-icon"
            disabled={editMutation.isLoading}
          >
            <svg className="bi">
              <use xlinkHref="#icon-check" />
            </svg>
          </button>
        </form>
      ) : (
        <>
          <p className="m-0">{user.name}</p>

          <span className="controll-icons">
            <button className="btn btn-icon" onClick={() => setIsEditing(true)}>
              <svg className="bi">
                <use xlinkHref="#icon-edit" />
              </svg>
            </button>

            <button
              className="btn btn-icon"
              type="button"
              onClick={() => {
                if (confirm('User will be deleted. Are you shure?'))
                  deleteUserFromDb()
              }}
            >
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
