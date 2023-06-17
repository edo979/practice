import type { APIRoute } from 'astro'
import { getAuth } from 'firebase-admin/auth'
import { app } from '../../../firebase/server'

const auth = getAuth(app)

async function isValidUser(sessionCookie?: string) {
  if (!sessionCookie) return false

  try {
    await auth.verifySessionCookie(sessionCookie)
    return true
  } catch (error) {
    return false
  }
}

export const del: APIRoute = async ({ request, cookies, params }) => {
  const id = params.id
  if (!id) return new Response(null, { status: 400 })

  if (!(await isValidUser(cookies.get('session').value)))
    return new Response('Not allowed!', { status: 401 })

  return new Response(null, { status: 200 })
}
