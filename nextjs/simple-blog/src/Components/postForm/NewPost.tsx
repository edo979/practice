'use client'

import { Data } from '@/pages/api/posts'
import { getCsrfToken } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import Form from './Form'

export default function NewPost() {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [actionData, setActionData] = useState<Data>()

  const isMutating = isFetching || isPending

  async function handleNewPost({
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, desc, body, csrf: await getCsrfToken() }),
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
      handleSubmit={handleNewPost}
      actionData={actionData}
      isSubmiting={isMutating}
    />
  )
}
