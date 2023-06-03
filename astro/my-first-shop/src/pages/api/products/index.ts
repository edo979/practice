import type { APIRoute } from 'astro'
import { app } from '../../../firebase/server'
import { getFirestore } from 'firebase-admin/firestore'

type ActionData = {
  formError?: string
  fieldErrors?: {
    name?: string
    price?: string
  }
  fields?: {
    name: string
    price: string
  }
}

const badRequest = (data: ActionData, status = 400) =>
  new Response(JSON.stringify(data), {
    status: 400,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const post: APIRoute = async ({ request, redirect }) => {
  const fomData = await request.formData()
  const name = fomData.get('name')
  const price = fomData.get('price')

  console.log(name, price)

  if (typeof name !== 'string' || typeof price !== 'string')
    return badRequest({ formError: 'Form submited wrong!' })

  return redirect('/products')
}
