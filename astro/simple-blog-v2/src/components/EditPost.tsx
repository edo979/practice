import { useState } from 'react'
import { PostT } from '../db/posts'
import PostForm, { actionData } from './PostForm'

export default function EditPost({
  csrfToken,
  post,
  postId,
}: {
  csrfToken: string
  post: PostT
  postId: string
}) {
  const [actionData, setActionData] = useState<actionData>({
    fields: { title: post.title, excerpt: post.desc, body: post.body },
  })
  const [isFetching, setIsFetching] = useState(false)

  async function handleSubmit({ title, body, excerpt }) {
    setIsFetching(true)
    const res = await fetch('/auth/api/posts.json', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        excerpt,
        csrfToken,
        postId,
      }),
      credentials: 'same-origin',
    })

    if (res.ok) {
      window.location.replace(`/auth/posts/${postId}`)
      return null
    }

    const actionData: actionData = await res.json()
    setIsFetching(false)
    setActionData(actionData)
    return null
  }

  return (
    <PostForm
      handleSubmit={handleSubmit}
      actionData={actionData}
      isFetching={isFetching}
    />
  )
}
