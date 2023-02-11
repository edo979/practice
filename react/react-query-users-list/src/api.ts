export type UserT = {
  _id: string
  name: string
}

const API_URL = import.meta.env.VITE_BASE_URI

export async function getUsers(limit = 2, page = 2) {
  const res = await fetch(`${API_URL}/users?limit=${limit}&page=${page}`)
  const {
    users,
    pageTotal,
    currentPage,
  }: { users: UserT[]; pageTotal: number; currentPage: number } =
    await res.json()
  return { users, pageTotal, currentPage }
}

export async function createUser(name: string) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
  const newUser: UserT = await res.json()
  return newUser
}

export async function updateUser({ id, name }: { id: string; name: string }) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  return await res.json()
}

export async function deleteUser(id: string) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}
