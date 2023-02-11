import Link from 'next/link'
import { getPosts } from '../lib/crud'

export default async function Home() {
  const posts = await getPosts()
  if (!posts) throw Error('Undefined')

  return (
    <>
      <header className="hero max-w-full rounded bg-base-200 sm:p-4 md:p-8">
        <div className="hero-content flex-col gap-4 sm:flex-row md:gap-8">
          <img
            src="/assets/hero-img.jpg"
            className="rounded-lg shadow-2xl w-full max-w-xs md:max-w-sm"
          />
          <div className="prose">
            <h1 className="text-5xl font-bold">Welcome to simple blog.</h1>
            <p className="py-6">
              This is for practice purpose only. This app should provide bloging
              platform for creating, editing and reading blog with modern
              technics and all up to data libraries.
            </p>
            <Link href={'posts/new'} className="btn btn-secondary">
              Add post
            </Link>
          </div>
        </div>
      </header>

      <main className="prose mt-4 mx-auto space-y-4">
        {posts.map((post) => (
          <article key={post._id}>
            <header>
              <h2>{post.title}</h2>
            </header>
            <main>
              <p className="text-lg">{post.desc}</p>
              <Link href={`posts/${post._id}`}>Read more...</Link>
            </main>
          </article>
        ))}
      </main>
    </>
  )
}
