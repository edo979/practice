import type { APIRoute } from 'astro'
import { isValidUser } from '../../firebase/utility/auth'
import { productsRef } from '../../firebase/utility/firestore'
import { bucket } from '../../firebase/utility/storage'

export const del: APIRoute = async ({ request, redirect, cookies, params }) => {
  const id = params.id
  if (!id) return new Response(null, { status: 400 })

  if (!(await isValidUser(cookies.get('session').value))) {
    return new Response('Not allowed!', { status: 401 })
  }

  const productRef = productsRef.doc(id)
  const doc = await productRef.get()

  if (doc.exists) {
    // Delete image from storage
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
        } catch (error: any) {
          // if file not exist continue
          if (error.code !== 404) return new Response(null, { status: 500 })
        }
      }
    }

    // Delete product from db
    try {
      productRef.delete()
      return redirect('/dashboard')
    } catch (error) {
      return new Response(null, { status: 500 })
    }
  } else {
    return new Response(null, { status: 404 })
  }
}
