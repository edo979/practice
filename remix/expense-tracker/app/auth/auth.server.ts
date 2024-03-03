import { createCookie } from '@remix-run/node'

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

export async function createAccount(data: UserDataT) {
  return 123
}
