'use client'

import { useEffect } from 'react'

export default function BlogErrorPage({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      {error.message === '400' ? <p>Not allowed</p> : <p>ok</p>}
      <p>Something went wrong while fetching Blogs from server!</p>
    </div>
  )
}
