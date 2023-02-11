'use client'

import { useEffect, useRef, useState } from 'react'
import { Data } from '@/pages/api/auth/register'

export default function UserForm({
  formHandler,
  actionData,
  submitBtnText,
}: {
  formHandler: (username: string, password: string) => Promise<null | undefined>
  actionData: Data | undefined
  submitBtnText?: string
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const userRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (actionData?.fieldsError?.username) {
      userRef.current?.focus()
    } else if (actionData?.fieldsError?.password) {
      passRef.current?.focus()
    }
  }, [actionData])

  async function handleSubmit() {
    setIsFetching(true)
    await formHandler(username, password)
    setIsFetching(false)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      {actionData?.formError && (
        <p className="p-4 mb-8 rounded border border-rose-400 shadow shadow-rose-600 bg-rose-500 text-rose-100">
          {actionData?.formError}
        </p>
      )}
      <div className="relative z-0 w-full mb-6">
        <input
          type="text"
          name="username"
          id="username"
          ref={userRef}
          className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-500 peer placeholder:text-transparent focus:placeholder:text-gray-400"
          placeholder=" "
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {actionData?.fieldsError?.username && (
          <p className="mt-0 text-sm text-rose-500">
            {actionData.fieldsError.username}
          </p>
        )}
        <label
          htmlFor="username"
          className="absolute text-gray-500 duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
        >
          Username:
        </label>
      </div>

      <div className="relative z-0 w-full mb-6">
        <input
          type="password"
          name="password"
          id="password"
          ref={passRef}
          className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-500 peer placeholder:text-transparent focus:placeholder:text-gray-400"
          placeholder=" "
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {actionData?.fieldsError?.password && (
          <p className="mt-0 text-sm text-rose-500">
            {actionData.fieldsError.password}
          </p>
        )}
        <label
          htmlFor="password"
          className="absolute text-gray-500 duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
        >
          Password:
        </label>
      </div>

      <div className="my-8 flex justify-end">
        <button className="btn btn-primary" disabled={isFetching}>
          {isFetching ? (
            <img
              src="/images/spinner.gif"
              className="w-5 h-5 mr-1.5 my-0 p-0"
            />
          ) : (
            '✔ '
          )}
          {submitBtnText ?? 'Login'}
        </button>
      </div>
    </form>
  )
}
