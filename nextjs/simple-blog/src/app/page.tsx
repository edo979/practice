import { getPosts } from '@/lib/postsModel'
import Link from 'next/link'

export default async function IndexRoute() {
  const posts = await getPosts()

  return (
    <>
      <header className="min-h-[300px] flex flex-col items-center gap-8 xl:gap-0 md:flex-row">
        <div className="w-full lg:w-auto lg:mx-auto">
          <img
            src="/images/hero-img.jpg"
            alt="be inspired"
            className="object-cover object-center h-[500px]  w-full lg:h-[600px]"
          />
        </div>
        <div className="prose px-4 mx-auto text-center sm:px-0 md:text-left xl:prose-lg">
          <h1>Welcome to Simple Blog</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae temporibus, quam maxime quod quasi, molestias odio
            dolores tempore ullam suscipit iste! Labore velit nemo laudantium
            reiciendis iure perferendis nostrum possimus tempore in expedita!
          </p>
          <button className="btn btn-primary">Add Post</button>
        </div>
      </header>

      <main className="my-12 mx-auto px-4 space-y-16 prose sm:px-2 md:my-16 lg:my-24">
        <h2 className="border-y-2 py-4">Posts:</h2>
        {posts.map((post) => (
          <article key={post._id.toString()}>
            <header>
              <h3>{post.title}</h3>
            </header>
            <main>
              <p>{post.desc}</p>
            </main>
            <aside>
              <Link href={`posts/${post._id.toString()}`}>Read more...</Link>
            </aside>
          </article>
        ))}
      </main>
    </>
  )
}
