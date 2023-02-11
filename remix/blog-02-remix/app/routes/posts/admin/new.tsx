import { ActionFunction, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import classNames from 'classnames'
import invariant from 'tiny-invariant'
import { createPost } from '~/models/post.server'

type ActionData =
  | { title: null | string; slug: null | string; markdown: null | string }
  | undefined

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

  await createPost({ title, slug, markdown })
  return redirect('/posts/admin')
}

export default function NewPost() {
  const errors = useActionData() as unknown as ActionData

  return (
    <Form method="post">
      <p className="lead">Create new post:</p>
      <div className="form-floating mb-2">
        <input
          type="text"
          className={classNames('form-control', {
            'is-invalid': errors?.title,
          })}
          id="title"
          name="title"
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
        <Link to={'/posts/admin'} className="btn btn-outline-dark">
          Cancel
        </Link>
      </div>
    </Form>
  )
}
