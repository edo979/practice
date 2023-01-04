type User = {
  id: number
  name: string
}

export async function getUsers() {
  const res = await fetch('http://localhost:5000/users')
  const users: User[] = await res.json()

  return users
}
