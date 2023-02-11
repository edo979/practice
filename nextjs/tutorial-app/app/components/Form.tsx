'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState, useTransition } from 'react'
import { ActionDataT } from '../../pages/api/posts'

type FormForPostPropsT = {
  data?: {
    title: string
    desc: string
    text: string
  }
  method?: string
  url?: string
}

export default function FormForPost({
  data,
  method = 'POST',
  url = '/api/posts',
}: FormForPostPropsT) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const [title, setTitle] = useState(data?.title || '')
  const [desc, setDesc] = useState(data?.desc || '')
  const [text, setText] = useState(data?.text || '')
  const [actionData, setActionData] = useState<ActionDataT>()
  const titleRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)

  const isMutating = isFetching || isPending

  useEffect(() => {
    if (actionData?.fieldsErrors?.title) {
      titleRef.current?.focus()
    } else if (actionData?.fieldsErrors?.desc) {
      descRef.current?.focus()
    } else if (actionData?.fieldsErrors?.text) {
      textRef.current?.focus()
    }
  }, [actionData])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsFetching(true)

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, desc, text }),
    })
    setIsFetching(false)

    if (res.ok) {
      if (method === 'PATCH') {
        startTransition(() => {
          router.back()
          router.refresh()
        })
      } else {
        startTransition(() => {
          router.replace('/')
          router.refresh()
        })
      }
      return null
    }

    const actionData: ActionDataT = await res.json()
    setActionData(actionData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="title" className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          ref={titleRef}
          type="text"
          id="title"
          className={
            'input input-primary w-full' +
            (actionData?.fieldsErrors?.title ? ' input-error' : '')
          }
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title..."
          aria-invalid={Boolean(actionData?.fieldsErrors?.title)}
          aria-describedby={
            actionData?.fieldsErrors?.title ? 'title-error' : undefined
          }
        />
        {actionData?.fieldsErrors?.title && (
          <label className="label pb-0 -mb-2">
            <span className="label-text-alt text-error" id="title-error">
              {actionData.fieldsErrors.title}
            </span>
          </label>
        )}
      </div>

      <div className="form-control mt-2">
        <label htmlFor="description" className="label">
          <span className="label-text">Descrioption</span>
        </label>

        <input
          ref={descRef}
          type="text"
          id="description"
          className={
            'input input-primary w-full' +
            (actionData?.fieldsErrors?.title ? ' input-error' : '')
          }
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Short description of post"
          aria-invalid={Boolean(actionData?.fieldsErrors?.title)}
          aria-describedby={
            actionData?.fieldsErrors?.desc ? 'desc-error' : undefined
          }
        />
        {actionData?.fieldsErrors?.desc && (
          <label className="label pb-0 -mb-2">
            <span className="label-text-alt text-error" id="desc-error">
              {actionData.fieldsErrors.desc}
            </span>
          </label>
        )}
      </div>

      <div className="form-control mt-2">
        <label htmlFor="text" className="label">
          <span className="label-text">Post text</span>
        </label>

        <textarea
          ref={textRef}
          id="text"
          className={
            'textarea textarea-primary w-full' +
            (actionData?.fieldsErrors?.title ? ' textarea-error' : '')
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Post text"
          aria-invalid={Boolean(actionData?.fieldsErrors?.text)}
          aria-describedby={
            actionData?.fieldsErrors?.text ? 'text-error' : undefined
          }
        />
        {actionData?.fieldsErrors?.text && (
          <label className="label pb-0">
            <span className="label-text-alt text-error" id="text-error">
              {actionData.fieldsErrors.text}
            </span>
          </label>
        )}
      </div>

      {actionData?.formError && (
        <p className="text-sm text-error text-end">{actionData.formError}</p>
      )}
      <div className="flex items-center justify-end gap-2 mt-4">
        <button
          className="btn"
          type="button"
          role="button"
          onClick={() => router.back()}
        >
          Back
        </button>

        {isMutating ? (
          <button className="btn btn-primary loading" disabled>
            Save
          </button>
        ) : (
          <button className="btn btn-primary" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
            </svg>
            Save
          </button>
        )}
      </div>
    </form>
  )
}
