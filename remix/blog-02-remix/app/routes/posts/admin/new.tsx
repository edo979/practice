import { ActionFunction, json, redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
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

  if (typeof title !== 'string') throw new Error('Title cant be empty!')
  if (typeof slug !== 'string') throw new Error('Slug cant be empty!')
  if (typeof markdown !== 'string') throw new Error('Markdown cant be empty!')

  await createPost({ title, slug, markdown })
  return redirect('/posts/admin')
}

export default function NewPost() {
  const errors = useActionData()
  console.log(errors)
  return (
    <Form method="post">
      <p className="lead">Create new post:</p>
      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="example-slug-like-post-title"
        ></input>
        <label htmlFor="title">Title</label>
      </div>

      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control"
          id="slug"
          name="slug"
          placeholder="example-slug-like-post-title"
        ></input>
        <label htmlFor="slug">Slug</label>
      </div>

      <div className="form-floating">
        <textarea
          name="markdown"
          id="markdown"
          className="form-control"
          placeholder="Body of the post"
          style={{ height: '300px' }}
        ></textarea>
        <label htmlFor="markdown">Post body content</label>
      </div>

      <button className="mt-2 btn btn-outline-dark" type="submit">
        Save
      </button>
    </Form>
  )
}
