'use client'

import { useState } from 'react'
import UserForm from './UserForm'
import { useRouter } from 'next/navigation'
import { Data } from '@/pages/api/auth/register'

export default function RegisterForm() {
  const router = useRouter()
  const [actionData, setActionData] = useState<Data>()

  async function handleRegister(username: string, password: string) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push('/dashboard')
        return null
      }

      const data: Data = await res.json()
      setActionData(data)
    } catch {
      setActionData({
        formError: 'Server Error. Registration is not successfull.',
      })
    }
  }

  return (
    <UserForm
      formHandler={handleRegister}
      actionData={actionData}
      submitBtnText={'Register'}
    />
  )
}
