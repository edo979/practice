import { json, LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { marked } from 'marked'
import { getPost } from '~/models/post.server'

type LoaderData = {
  post: Awaited<ReturnType<typeof getPost>>
  html: string
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'params slug is required')

  const post = await getPost(params.slug)
  invariant(post, 'Post not found')

  const html = marked(post.markdown)
  return json<LoaderData>({ post, html })
}

export default function EditPost() {
  const { post, html } = useLoaderData() as unknown as LoaderData

  return (
    <>
      <div className="hstack">
        <Link to={'edit'} className="btn btn-outline-dark btn-sm mb-3 ms-auto">
          Edit
        </Link>
        <Link to={'edit'} className="btn btn-outline-dark btn-sm mb-3 ms-2">
          Delete
        </Link>
      </div>
      <h2>{post?.title}</h2>

      <p className="lead">
        Slug: <em>{post?.slug}</em>
      </p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}
