import type { APIRoute } from 'astro'

export const del: APIRoute = async ({ request, params }) => {
  const id = params.id
  if (!id)
    return new Response(null, { status: 400, statusText: 'product not found' })

  return new Response(null, {
    status: 200,
  })
}
