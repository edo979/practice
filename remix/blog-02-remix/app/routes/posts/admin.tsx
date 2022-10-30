import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { getPosts } from '~/models/post.server'

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

export const loader = async () => {
  return json({ posts: await getPosts() })
}

export default function Admin() {
  const { posts } = useLoaderData() as unknown as LoaderData
  return (
    <div className="row">
      <div className="list-group col-md-6">
        <p className="lead">Posts:</p>
        {posts.map((post) => (
          <Link
            to={post.slug}
            className="list-group-item list-group-item-action"
            key={post.slug}
          >
            {post.title}
          </Link>
        ))}
      </div>
      <div className="col-md-6">
        <Outlet />
      </div>
    </div>
  )
}
