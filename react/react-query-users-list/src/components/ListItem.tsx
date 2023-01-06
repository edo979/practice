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
    <li className="user-list_item even:bg-gray-100 py-2 border-t border-gray-400 first:border-t-0">
      {isEditing ? (
        <form
          className="flex justify-between gap-1"
          onSubmit={(e) => {
            e.preventDefault()
            handleEditUser({ id: user.id, userName })
            setIsEditing(false)
          }}
        >
          <input
            type="text"
            className="form-control"
            ref={editInputRef}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            readOnly={isLoading}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            <svg className="bi">
              <use xlinkHref="#icon-check" />
            </svg>
          </button>
        </form>
      ) : (
        <div className="flex justify-between pl-2">
          <p>{user.name}</p>

          <span>
            <button
              className="hover:text-blue-400"
              onClick={() => setIsEditing(true)}
            >
              <svg className="bi">
                <use xlinkHref="#icon-edit" />
              </svg>
            </button>

            <button
              className="ml-2 hover:text-red-500"
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
        </div>
      )}
    </li>
  )
}
