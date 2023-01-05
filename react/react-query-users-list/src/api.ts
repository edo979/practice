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

export async function saveUser(name: string) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const id = await getId()
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  })
}

export async function getId() {
  const res = await fetch(`${API_URL}/users?_page=1&_limit=1`)
  const count = res.headers.get('x-total-count')

  if (!count) {
    throw new Error("Cant't get id")
  }

  return parseInt(count) + 1
}
