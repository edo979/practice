import type { APIRoute } from 'astro'

export const del: APIRoute = async ({ request }) => {
  const body = await request.json()
  const id = body.id

  return new Response(null, {
    status: 200,
    statusText: 'deleted',
  })
}
