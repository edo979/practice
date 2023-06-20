import type { APIRoute } from 'astro'
import {
  validateProductImage,
  validateProductName,
  validateProductPrice,
} from '../../../utils/newProductFormValidators'

export const get: APIRoute = async ({ request }) => {
  return new Response(null, { status: 200 })
}

export const post: APIRoute = async ({ request }) => {
  type ActionDataT = {
    formError?: string
    fields?: {
      name?: string
      price?: string
    }
    fieldsError?: {
      name?: string
      price?: string
      image?: string
    }
  }

  const actionData: ActionDataT = {}

  const formData = await request.formData()
  const name = formData.get('name')
  const price = formData.get('price')
  const image = formData.get('product_image') as File | undefined

  if (
    !name ||
    typeof name !== 'string' ||
    !price ||
    typeof price !== 'string'
  ) {
    actionData.formError = 'Form submitet wrong!'
    return new Response(JSON.stringify(actionData), { status: 400 })
  }

  const formFields = { name, price }
  const fieldsError = {
    name: validateProductName(name),
    price: validateProductPrice(price),
    image: validateProductImage(image),
  }

  if (Object.values(fieldsError).some(Boolean)) {
    actionData.fieldsError = fieldsError
    actionData.fields = formFields
    return new Response(JSON.stringify(actionData), { status: 400 })
  }

  return new Response(JSON.stringify({ data: 'jah' }), { status: 200 })
}
