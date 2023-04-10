import {
  ActionFunction,
  useActionData,
  Form,
  redirect,
  LoaderFunction,
  useLoaderData,
} from 'react-router-dom'
import { postAdded } from './postsSlice'
import store from '../../store/store'
import { useAppSelector } from '../../store/hooks'
import { selectUsers } from '../users/usersSlice'
import { useState } from 'react'

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
  const userId = formData.get('userId')
  console.log(userId)

  if (
    typeof title !== 'string' ||
    typeof content !== 'string' ||
    typeof userId !== 'string'
  )
    return {
      formError: 'Form Error',
    }

  if (title.length == 0 || content.length == 0 || userId === '')
    return {
      formError: 'Add more text',
      fields: { postContent: content, postTitle: title },
    }

  store.dispatch(postAdded(title, content, userId))

  return redirect('/blog')
}

const AddPostForm = () => {
  const error = useActionData() as ActionDataT
  const users = useAppSelector(selectUsers)
  const [userId, setUserId] = useState('')

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

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
        <br />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          name="userId"
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <br />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue={error?.fields?.postContent ?? ''}
        />
        <br />
        <button type="submit">Save Post</button>
      </Form>
    </section>
  )
}

export default AddPostForm
