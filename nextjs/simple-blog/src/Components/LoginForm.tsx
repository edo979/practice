'use client'

import UserForm from './UserForm'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Data } from '@/pages/api/auth/register'

export default function LoginForm() {
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') || '/dashboard'
  const errorMsg = params.get('error')
  const [actionData, setActionData] = useState<Data>()

  useEffect(() => {
    if (errorMsg) {
      if (errorMsg === 'CredentialsSignin') {
        setActionData({ formError: 'Wrong username or password' })
      } else {
        setActionData({ formError: errorMsg })
      }
    } else {
      setActionData(undefined)
    }
  }, [errorMsg])

  async function loginHandler(username: string, password: string) {
    await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: callbackUrl,
    })

    return null
  }

  return <UserForm formHandler={loginHandler} actionData={actionData} />
}
