import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getPosts } from '~/models/post.server'

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  })
}

export default function Posts() {
  const { posts } = useLoaderData() as unknown as LoaderData

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Link to={'admin'}>Admin</Link>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
