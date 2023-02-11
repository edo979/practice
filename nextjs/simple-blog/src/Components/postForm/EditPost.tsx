'use client'

import { PostT } from '@/lib/postsModel'
import { Data } from '@/pages/api/posts'
import { WithId } from 'mongodb'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { getCsrfToken } from 'next-auth/react'
import Form from './Form'

type EditProps = {
  postId: string
  postData: WithId<PostT>
}

export default function EditPost({ postId, postData }: EditProps) {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [actionData, setActionData] = useState<Data>({
    fields: { title: postData.title, desc: postData.desc, body: postData.body },
  })

  const isMutating = isFetching || isPending

  async function handleEditPost({
    title,
    desc,
    body,
  }: {
    title: string
    desc: string
    body: string
  }) {
    setIsFetching(true)
    const res = await fetch('/api/posts', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: postId,
        title,
        desc,
        body,
        csrf: await getCsrfToken(),
      }),
    })

    if (res.ok) {
      startTransition(() => {
        router.replace('/dashboard')
        router.refresh()
      })
      return null
    }

    const data = (await res.json()) as Data
    setIsFetching(false)
    setActionData(data)
  }

  return (
    <Form
      handleSubmit={handleEditPost}
      actionData={actionData}
      isSubmiting={isMutating}
    />
  )
}
