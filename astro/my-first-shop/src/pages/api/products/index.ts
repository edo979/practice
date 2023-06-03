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

const validateProductName = (name: string) => {
  if (name.length < 3) return 'Name is to Short!'
}
const validateProductPrice = (price: string) => {
  if (!parseFloat(price)) return 'Please enter valid price in this format 34.44'
}

export const post: APIRoute = async ({ request, redirect }) => {
  const fomData = await request.formData()
  const name = fomData.get('name')
  const price = fomData.get('price')

  if (typeof name !== 'string' || typeof price !== 'string')
    return badRequest({ formError: 'Form submited wrong!' })

  const fieldErrors = {
    name: validateProductName(name),
    price: validateProductPrice(price),
  }
  const fields = {
    name,
    price,
  }

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields })

  return redirect('/products')
}
