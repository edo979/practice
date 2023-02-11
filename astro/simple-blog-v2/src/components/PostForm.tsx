import { useEffect, useRef, useState } from 'react'

export type actionData = {
  formError?: string
  fieldErrors?: {
    title?: string
    excerpt?: string
    body?: string
  }
  fields?: {
    title?: string
    excerpt?: string
    body?: string
  }
}

type PostFormProps = {
  handleSubmit: ({
    title,
    body,
    excerpt,
  }: {
    title: string
    body: string
    excerpt: string
  }) => void
  actionData?: actionData
  isFetching: boolean
}

export default function PostForm({
  handleSubmit,
  actionData,
  isFetching = false,
}: PostFormProps) {
  const [title, setTitle] = useState<string | undefined>(
    actionData?.fields?.title || ''
  )
  const [excerpt, setExcerpt] = useState<string | undefined>(
    actionData?.fields?.excerpt || ''
  )
  const [body, setBody] = useState<string | undefined>(
    actionData?.fields?.body || ''
  )
  const titleRef = useRef<HTMLInputElement>(null)
  const excerptRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (actionData?.fieldErrors?.title) {
      titleRef.current.focus()
    } else if (actionData?.fieldErrors?.excerpt) {
      excerptRef.current.focus()
    } else if (actionData?.fieldErrors?.body) {
      bodyRef.current.focus()
    }
  }, [actionData])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit({ title, excerpt, body })
      }}
      className="dark"
    >
      <label htmlFor="title" className="form-label">
        Naslov
      </label>
      <input
        ref={titleRef}
        type="text"
        name="title"
        id="title"
        required
        className={
          'form-control' + (actionData?.fieldErrors?.title ? ' is-invalid' : '')
        }
        aria-required="true"
        aria-invalid={actionData?.fieldErrors?.title ? 'true' : 'false'}
        aria-errormessage="tittleError"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {actionData?.fieldErrors?.title && (
        <p id="tittleError" className="-mb-2 text-sm font-bold text-red-500">
          {actionData.fieldErrors.title}
        </p>
      )}

      <label htmlFor="excerpt" className="form-label">
        Opis
      </label>
      <input
        ref={excerptRef}
        type="text"
        name="excerpt"
        id="excerpt"
        required
        className={
          'form-control' +
          (actionData?.fieldErrors?.excerpt ? ' is-invalid' : '')
        }
        aria-required="true"
        aria-invalid={actionData?.fieldErrors?.excerpt ? 'true' : 'false'}
        aria-errormessage="excerptError"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />
      {actionData?.fieldErrors?.excerpt && (
        <p id="excerptError" className="-mb-2 text-sm font-bold text-red-500">
          {actionData.fieldErrors.excerpt}
        </p>
      )}

      <label htmlFor="body" className="form-label">
        Sadržaj
      </label>
      <textarea
        ref={bodyRef}
        rows={8}
        name="body"
        id="body"
        required
        className={
          'form-control' + (actionData?.fieldErrors?.body ? ' is-invalid' : '')
        }
        aria-required="true"
        aria-invalid={actionData?.fieldErrors?.body ? 'true' : 'false'}
        aria-errormessage="bodyError"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      {actionData?.fieldErrors?.body && (
        <p id="bodyError" className="-mb-2 text-sm font-bold text-red-500">
          {actionData.fieldErrors.body}
        </p>
      )}

      {actionData?.formError && (
        <div className="flex justify-end">
          <p className="-mb-4 text-sm font-bold text-red-500">
            {actionData.formError}
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-row justify-end">
        <a href="/auth">
          <button className="btn btn-primary mr-2" type="button" role="button">
            ❌ Odustani
          </button>
        </a>
        <button type="submit" className="btn btn-primary" disabled={isFetching}>
          {isFetching ? (
            <svg
              className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <span>✔ </span>
          )}
          Sačuvaj
        </button>
      </div>
    </form>
  )
}
