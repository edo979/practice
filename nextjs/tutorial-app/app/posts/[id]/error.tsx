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
    console.log(error)
    console.log('id folder')
  }, [error])

  return (
    <div>
      <p>Post isn't deleted. Something went wrong!</p>
      {/* <button className="btn btn-primary" onClick={() => reset()}>
        Reset error boundary
      </button> */}
    </div>
  )
}
