import { useState } from 'react'
import PostForm, { actionData } from './PostForm'

export default function NewPost({ csrfToken }: { csrfToken: string }) {
  const [actionData, setActionData] = useState<actionData>()
  const [isFetching, setIsFetching] = useState(false)

  async function handleSubmit({ title, body, excerpt }) {
    setIsFetching(true)
    const res = await fetch('/auth/api/posts.json', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, excerpt, csrfToken }),
      credentials: 'same-origin',
    })

    if (res.ok) {
      window.location.replace('/auth')
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
