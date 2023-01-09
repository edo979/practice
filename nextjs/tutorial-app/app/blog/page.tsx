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
    <>
      <header className="m-4 mb-8 text-center gradient-container">
        <h1 className="my-4 h1">Welcome to Blog</h1>
        <p className="text-lg mb-6 px-8 font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quas
          itaque suscipit quod soluta amet?
        </p>
        <button className="btn btn-primary">Read more</button>
      </header>

      <main>
        <h2 className="h2 mb-4">Blog for modern blogging!</h2>
        <p className="text-justify">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
          ullam nobis, labore necessitatibus ducimus voluptate omnis
          repudiandae, odit unde quas aliquam voluptatem, atque id quibusdam.
        </p>

        <Counter />

        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      </main>
    </>
  )
}
