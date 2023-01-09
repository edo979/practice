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
      <header className="mx-4 my-12 text-center gradient-container">
        <h1 className="my-4 h1">Welcome to Blog</h1>
        <p className="text-lg mb-6 px-8 font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quas
          itaque suscipit quod soluta amet?
        </p>
        <button className="btn btn-primary">Read more</button>
      </header>

      <main>
        <h2 className="h2">Blog for modern blogging!</h2>
        <p className="text-justify">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
          ullam nobis, labore necessitatibus ducimus voluptate omnis
          repudiandae, odit unde quas aliquam voluptatem, atque id quibusdam.
        </p>

        <Counter />

        <h2 className="h2">This blog can use fetch API</h2>
        <p>
          Data in bottom table is fetched from server using javaScript fetch api
          and async/await api, too.
        </p>
        <ul className="w-full my-4">
          {users.map((user) => (
            <li
              className="py-2 border-t border-slate-600 even:bg-slate-200 first:border-none"
              key={user._id}
            >
              <span className="pl-4">{user.name}</span>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
