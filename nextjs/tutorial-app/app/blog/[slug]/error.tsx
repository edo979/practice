'use client'

import { useEffect } from 'react'

export default function SingleBlogErrorRote({
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
      <p>Something went wrong!</p>
    </div>
  )
}
