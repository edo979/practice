import { useState } from 'react'
import { User } from '../api'

type ListItemProps = {
  user: User
}

export default function ListItem({ user }: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(user.name)

  async function updateUser() {}

  return (
    <li className="user-list_item" key={user.id}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="btn btn-icon" onClick={updateUser}>
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
