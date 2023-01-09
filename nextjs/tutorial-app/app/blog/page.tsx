import Counter from './components/counter'

export default async function BlogRoute() {
  const res = await fetch(
    'https://just-users-names.vercel.app/api/users?limit=5&page=1'
  )
  if (!res.ok) {
    throw new Error(res.status.toString())
  }
  const { users }: { users: { _id: string; name: string }[] } = await res.json()

  return (
    <div>
      <h2>Blog Route</h2>

      <Counter />
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
