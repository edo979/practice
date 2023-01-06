import { v4 as uuid4 } from 'uuid'

export type User = {
  id: number
  name: string
}

const API_URL = 'http://localhost:5000'

export async function getUsers() {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const res = await fetch(`${API_URL}/users`)
  const users: User[] = await res.json()

  return users
}

export async function createUser(name: string) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: uuid4(), name }),
  })

  return await res.json()
}

export async function updateUser({ id, name }: { id: number; name: string }) {
  await new Promise((resolve) => setTimeout(resolve, 500))

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
  await new Promise((resolve) => setTimeout(resolve, 500))

  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
