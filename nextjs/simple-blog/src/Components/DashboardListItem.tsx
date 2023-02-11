'use client'

import { getCsrfToken } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type PropsT = {
  title: string
  id: string
}

export default function DashboardListItem({ title, id }: PropsT) {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(false)

  async function handleClick() {
    const csrfToken = await getCsrfToken()
    if (!confirm('This post will be deleted. Are you shure?')) return

    setIsFetching(true)
    const res = await fetch('/api/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, reqCsfrToken: csrfToken }),
    })

    setIsFetching(false)

    if (res.ok) {
      router.refresh()
    } else {
      alert('Error while deleting post!')
    }
  }

  return (
    <div className="flex justify-between items-baseline">
      <p>{title}</p>
      <span>
        <Link href={`dashboard/posts/${id}/edit`} className="active:scale-95">
          ✏
        </Link>
        <button
          className="ml-4 md:ml-2 active:scale-95"
          disabled={isFetching}
          onClick={handleClick}
        >
          ❌
        </button>
      </span>
    </div>
  )
}
