'use client'

import { Data } from '@/pages/api/posts'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

type FormProps = {
  handleSubmit: ({
    title,
    desc,
    body,
  }: {
    title: string
    desc: string
    body: string
  }) => void
  actionData?: Data
  isSubmiting: boolean
}

export default function Form({
  handleSubmit,
  actionData,
  isSubmiting,
}: FormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(actionData?.fields?.title || '')
  const [desc, setDesc] = useState(actionData?.fields?.desc || '')
  const [body, setBody] = useState(actionData?.fields?.body || '')
  const titleRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (actionData?.fieldsError?.title) {
      titleRef.current?.focus()
    } else if (actionData?.fieldsError?.desc) {
      descRef.current?.focus()
    } else if (actionData?.fieldsError?.body) {
      bodyRef.current?.focus()
    }
  }, [actionData])

  return (
    <form
      className="space-y-6 mb-16"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit({ title, desc, body })
      }}
    >
      <div className="form-control">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          className={classNames('form-input', {
            'is-invalid': Boolean(actionData?.fieldsError?.title),
          })}
          placeholder="Title of post"
          aria-invalid={actionData?.fieldsError?.title ? 'true' : 'false'}
          aria-errormessage={
            actionData?.fieldsError?.title ? 'titleError' : undefined
          }
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {actionData?.fieldsError?.title && (
          <p
            id="titleError"
            className="m-0 mt-1 -mb-2 text-sm font-semibold text-rose-500"
          >
            {actionData.fieldsError.title}
          </p>
        )}
      </div>

      <div className="form-control">
        <label htmlFor="desc" className="form-label">
          Description
        </label>
        <input
          type="text"
          id="desc"
          ref={descRef}
          className={classNames('form-input', {
            'is-invalid': Boolean(actionData?.fieldsError?.desc),
          })}
          placeholder="Add description"
          aria-invalid={actionData?.fieldsError?.desc ? 'true' : 'false'}
          aria-errormessage={
            actionData?.fieldsError?.desc ? 'descError' : undefined
          }
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {actionData?.fieldsError?.desc && (
          <p
            id="descError"
            className="m-0 mt-1 -mb-2 text-sm font-semibold text-rose-500"
          >
            {actionData.fieldsError.desc}
          </p>
        )}
      </div>

      <div className="form-control">
        <label htmlFor="body" className="form-label">
          Text
        </label>
        <textarea
          rows={10}
          id="body"
          ref={bodyRef}
          className={classNames('form-input', {
            'is-invalid': Boolean(actionData?.fieldsError?.body),
          })}
          placeholder="Content of post"
          aria-invalid={actionData?.fieldsError?.body ? 'true' : 'false'}
          aria-errormessage={
            actionData?.fieldsError?.body ? 'bodyError' : undefined
          }
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {actionData?.fieldsError?.body && (
          <p
            id="bodyError"
            className="m-0 mt-1 -mb-2 text-sm font-semibold text-rose-500"
          >
            {actionData.fieldsError.body}
          </p>
        )}
      </div>

      {actionData?.formError && (
        <div className="flex justify-end">
          <p className="m-0 -mb-4 text-sm font-semibold text-rose-500">
            {actionData.formError}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-4 md:gap-2">
        <button
          type="button"
          role="button"
          className="btn btn-dark"
          onClick={() => router.back()}
        >
          ❌ Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmiting}
        >
          {isSubmiting ? (
            <img
              src="/images/spinner.gif"
              className="w-5 h-5 mr-1.5 my-0 p-0"
            />
          ) : (
            '💾 '
          )}
          Save
        </button>
      </div>
    </form>
  )
}
