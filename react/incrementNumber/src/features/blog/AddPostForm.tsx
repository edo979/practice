import { ActionFunction, useActionData, Form, redirect } from 'react-router-dom'
import { postAdded } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'
import store from '../../store/store'

type ActionDataT = {
  formError?: string
  fields?: {
    postTitle: string
    postContent: string
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const title = formData.get('postTitle')
  const content = formData.get('postContent')

  if (typeof title !== 'string' || typeof content !== 'string')
    return {
      formError: 'Form Error',
    }

  if (title.length == 0 || content.length == 0)
    return {
      formError: 'Add more text',
      fields: { postContent: content, postTitle: title },
    }

  if (title && content) {
    store.dispatch(
      postAdded({
        id: nanoid(),
        title,
        content,
      })
    )
  }

  return redirect('/blog')
}

const AddPostForm = () => {
  const error = useActionData() as ActionDataT
  //console.log(error)

  return (
    <section>
      <h2>Add a New Post</h2>
      <Form method="post">
        {error && <p>{error.formError}</p>}
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          defaultValue={error?.fields?.postTitle ?? ''}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue={error?.fields?.postContent ?? ''}
        />

        <button type="submit">Save Post</button>
      </Form>
    </section>
  )
}

export default AddPostForm
