'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import React from 'react'
export default function SessionProviderComponents({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
