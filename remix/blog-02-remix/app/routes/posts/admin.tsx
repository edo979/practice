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
      <div className="col-md-5">
        <p className="lead">Posts:</p>
        <Link to={'new'} className="btn btn-dark mb-2 d-block">
          New
        </Link>
        <div className="list-group ">
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
      </div>
      <div className="col-md-7">
        <Outlet />
      </div>
    </div>
  )
}
