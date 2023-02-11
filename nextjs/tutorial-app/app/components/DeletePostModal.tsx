'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function DeleteModal({ postId }: { postId: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const isMutating = isPending || isFetching

  async function handleDelete() {
    setIsFetching(true)
    const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
    setIsFetching(false)

    switch (res.status) {
      case 200:
        startTransition(() => {
          router.replace('/')
          router.refresh()
        })
        break

      case 400:
        setErrorMessage('This is not your post!')
        break

      case 500:
        setErrorMessage('Something went wrong!')
        break

      default:
        break
    }

    return null
  }

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div
        className="modal"
        onAnimationEnd={() => errorMessage && setErrorMessage(undefined)}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Post!</h3>
          {errorMessage ? (
            <p className="text-error text-md py-4">
              {errorMessage} <b>Post isn't deleted.</b>
            </p>
          ) : (
            <p className="py-4">This post will be deleted. Are you shoure?</p>
          )}

          <div className="modal-action">
            {!errorMessage && (
              <button
                className={'btn btn-error' + (isMutating ? ' loading' : '')}
                onClick={handleDelete}
              >
                ✔ Yes
              </button>
            )}

            <label htmlFor="my-modal" className="btn">
              ❌ Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
