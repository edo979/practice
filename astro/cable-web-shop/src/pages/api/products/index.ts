import type { APIRoute } from 'astro'

export const get: APIRoute = async ({ request }) => {
  return new Response(null, { status: 200 })
}

export const post: APIRoute = async ({ request }) => {
  return new Response(null, { status: 200 })
}
