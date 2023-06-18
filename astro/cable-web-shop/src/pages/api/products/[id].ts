import type { APIRoute } from 'astro'
import { getAuth } from 'firebase-admin/auth'
import { app } from '../../../firebase/server'
import { productsRef } from '../../../firebase/utility/firestore'
import { bucket } from '../../../firebase/utility/storage'

async function isValidUser(sessionCookie?: string) {
  if (!sessionCookie) return false

  try {
    const auth = getAuth(app)
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
    const imageUrl: string | undefined = doc.data()?.imageUrl
    if (imageUrl) {
      const imageName = imageUrl.split('/').pop()?.replace('%2F', '/')
      if (imageName) {
        const file = bucket.file(imageName)
        try {
          const generationMatchNumber = new Date().getTime()
          request.headers.append(
            'x-goog-if-generation-match',
            generationMatchNumber.toString()
          )
          await file.delete({ ifGenerationMatch: generationMatchNumber })
          // continue to firestore
        } catch (error) {
          // abort deleting operation
          console.log(error)
          return new Response(null, { status: 500 })
        }
      }
    }
  }

  // Delete product from db

  return new Response(null, { status: 200 })
}
