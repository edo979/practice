import React from 'react'
import { unstable_getServerSession } from 'next-auth'
import LoginButton from '@/Components/LoginButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await unstable_getServerSession()

  if (session?.user) {
    return <main>{children}</main>
  }

  return (
    <main className="prose my-8 mx-auto">
      <h1>Please login to proceed</h1>
      <p>
        Sorry You can&lsquo;t visited page you requested. Go to Login page and
        proceed to page you requested.
      </p>
      <hr />
      <LoginButton />
    </main>
  )
}
