export type User = {
  id: number
  name: string
}

const API_URL = 'http://localhost:3000/api'

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`)
  const users: User[] = await res.json()
  console.log(users)
  return users
}

export async function createUser(name: string) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  return await res.json()
}

export async function updateUser({ id, name }: { id: number; name: string }) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  return await res.json()
}

export async function deleteUser(id: number) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
