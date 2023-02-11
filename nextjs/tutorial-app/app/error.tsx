'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error, 'api folder')
  }, [error])

  return (
    <div>
      <p>Something went wrong!</p>
      {/* <button className="btn btn-primary" onClick={() => reset()}>
        Reset error boundary
      </button> */}
    </div>
  )
}
