import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import classNames from 'classnames'
import { useRef } from 'react'
import invariant from 'tiny-invariant'
import { getPost, updatePost } from '~/models/post.server'

type ActionData =
  | { title: null | string; slug: null | string; markdown: null | string }
  | undefined

type LoaderData = {
  post: Awaited<ReturnType<typeof getPost>>
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const title = formData.get('title')
  const slug = formData.get('slug')
  const markdown = formData.get('markdown')

  const errors: ActionData = {
    title: title ? null : 'Title is required',
    slug: slug ? null : 'Slug is required',
    markdown: markdown ? null : 'Markdown is required',
  }
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)

  if (hasErrors) return json<ActionData>(errors)

  invariant(typeof title === 'string', 'title must be a string')
  invariant(typeof slug === 'string', 'slug must be a string')
  invariant(typeof markdown === 'string', 'markdown must be a string')

  await updatePost(slug, { title, slug, markdown })
  return redirect(`/posts/admin/${slug}`)
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'params slug is required')

  const post = await getPost(params.slug)
  invariant(post, 'Post not found')

  return json<LoaderData>({ post })
}

export default function EditPost() {
  const errors = useActionData()
  const { post } = useLoaderData() as unknown as LoaderData

  return (
    <Form method="patch">
      <p className="lead">Edit post:</p>

      <div className="form-floating mb-2">
        <input
          type="text"
          className={classNames('form-control', {
            'is-invalid': errors?.title,
          })}
          id="title"
          name="title"
          defaultValue={post?.title}
          placeholder="example-slug-like-post-title"
        />
        <label htmlFor="title">Title</label>
        <div className="invalid-feedback">{errors?.title}</div>
      </div>

      <div className="form-floating mb-2">
        <input
          type="text"
          className={classNames('form-control', {
            'is-invalid': errors?.slug,
          })}
          id="slug"
          name="slug"
          defaultValue={post?.slug}
          placeholder="example-slug-like-post-title"
        />
        <label htmlFor="slug">Slug</label>
        <div className="invalid-feedback">{errors?.slug}</div>
      </div>

      <div className="form-floating">
        <textarea
          name="markdown"
          id="markdown"
          className={classNames('form-control', {
            'is-invalid': errors?.markdown,
          })}
          defaultValue={post?.markdown}
          placeholder="Body of the post"
          style={{ height: '300px' }}
        ></textarea>
        <label htmlFor="markdown">Post body content</label>
        <div className="invalid-feedback">{errors?.markdown}</div>
      </div>

      <div className="mt-2 btn-group">
        <button className="btn btn-outline-dark" type="submit">
          Save
        </button>
        <Link
          to={'/posts/admin/' + post?.slug}
          className="btn btn-outline-dark"
        >
          Cancel
        </Link>
      </div>
    </Form>
  )
}
