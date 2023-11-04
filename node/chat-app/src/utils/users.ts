type User = {
  id: string
  username: string
  room: string
}

const users: User[] = []

export const addUser = ({
  id,
  username,
  room,
}: {
  id: string
  username: string
  room: string
}) => {
  username = username.trim().toLocaleLowerCase()
  room = room.trim().toLocaleLowerCase()

  if (!username || !room) return { error: 'Username and room are required!' }

  const isUserExist = users.find(
    (user) => user.room === room && user.username === username
  )

  if (isUserExist) return { error: 'Username is in use!' }

  const user = { id, username, room }
  users.push(user)

  return { user }
}

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) return users.splice(index, 1)[0]
}
