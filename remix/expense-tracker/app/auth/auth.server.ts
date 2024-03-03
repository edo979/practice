import { createCookie, redirect } from '@remix-run/node'

export type UserDataRawT = {
  email?: string
  password?: string
}

export type UserDataT = {
  email: string
  password: string
}

const secret = process.env.COOKIE_SECRET || 'some77default88secret'

export const authCookie = createCookie('auth', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secrets: [secret],
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 30,
})

export async function getUserIdFromAuthCookie(request: Request) {
  return (await authCookie.parse(request.headers.get('Cookie'))) as
    | string
    | null
}

export async function throwRedirectToAuth() {
  throw redirect('/auth', {
    headers: {
      'Set-Cookie': await authCookie.serialize('', { maxAge: 0 }),
    },
  })
}

export async function requireAuthCookie(request: Request) {
  const userId = await getUserIdFromAuthCookie(request)

  if (!userId)
    throw redirect('/auth', {
      headers: {
        'Set-Cookie': await authCookie.serialize('', { maxAge: 0 }),
      },
    })

  return userId
}

// ****************************************************************
// User
// ****************************************************************

export async function createAccount(data: UserDataT) {
  return 123
}

export async function getUser(data: UserDataT) {
  return 'testuserid'
}
