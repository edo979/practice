import { useEffect, useRef, useState } from 'react'
import { User } from '../api'

type ListItemProps = {
  user: User
  handleDeleteUser: (id: number) => void
  handleEditUser: ({ id, userName }: { id: number; userName: string }) => void
  isLoading: boolean
}

export default function ListItem({
  user,
  handleDeleteUser,
  handleEditUser,
  isLoading,
}: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(user.name)
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) editInputRef.current?.focus()
  }, [isEditing])

  return (
    <li className="user-list_item">
      {isEditing ? (
        <form
          className="d-flex align-center gap-1 w-100"
          onSubmit={(e) => {
            e.preventDefault()
            handleEditUser({ id: user.id, userName })
            setIsEditing(false)
          }}
        >
          <input
            type="text"
            ref={editInputRef}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            readOnly={isLoading}
          />
          <button type="submit" className="btn btn-icon" disabled={isLoading}>
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
                  handleDeleteUser(user.id)
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
