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
