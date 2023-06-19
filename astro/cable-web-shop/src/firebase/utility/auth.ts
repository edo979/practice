import { getAuth } from 'firebase-admin/auth'
import { app } from '../server'

const auth = getAuth(app)

export async function isValidUser(sessionCookie?: string) {
  if (!sessionCookie) return false

  try {
    await auth.verifySessionCookie(sessionCookie)
    return true
  } catch (error) {
    return false
  }
}

export async function getUser(sessionCookie?: string) {
  if (!sessionCookie) return null

  try {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie)
    const user = await auth.getUser(decodedCookie.uid)
    return user
  } catch (error) {
    return null
  }
}
