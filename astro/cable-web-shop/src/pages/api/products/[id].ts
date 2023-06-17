import type { APIRoute } from 'astro'
import { getAuth } from 'firebase-admin/auth'
import { app } from '../../../firebase/server'
import { productsRef } from '../../../firebase/utility/firestore'

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

  // Delete image from storage
  const productRef = productsRef.doc(id)
  const doc = await productRef.get()
  if (doc.exists) {
    const imageUrl = doc.data()!.imageUrl as string
    const imageName = imageUrl.split('/').pop()?.split('%').pop()
    return new Response(`imageUrl: ${imageName}`, { status: 200 })
  }

  // Delete product from db

  return new Response(null, { status: 200 })
}
