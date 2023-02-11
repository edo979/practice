import { APIRoute } from 'astro'
import { deletePost, updatePost } from '../../../db/posts'
import { actionData } from '../../../components/PostForm'
import { createPost } from '../../../db/posts'
import { compareHashAndPassword } from 'node-hash-password'

const validateInput = (input: string): string | undefined => {
  if (input.length < 3) return 'Please input more data.'
}

const badRequest = (message = 'Form Submited Wrong!', status = 400) => {
  return new Response(JSON.stringify({ formError: message }), { status })
}

export const post: APIRoute = async ({ request, cookies }) => {
  if (request.headers.get('Content-Type') !== 'application/json')
    return badRequest()

  const { title, excerpt, body, csrfToken: csrf } = await request.json()

  if (csrf !== cookies.get('csrf').value) {
    return badRequest()
  }

  if (
    !compareHashAndPassword({
      method: 'keccak256',
      hash: cookies.get(import.meta.env.LOGIN_COOKIE).value,
      session: import.meta.env.SESSION,
    })
  ) {
    return badRequest()
  }

  if (
    typeof title !== 'string' ||
    typeof excerpt !== 'string' ||
    typeof body !== 'string'
  ) {
    return badRequest()
  }

  const fields = { title, excerpt, body }
  const fieldErrors = {
    title: validateInput(title),
    excerpt: validateInput(excerpt),
    body: validateInput(body),
  }

  const actionData: actionData = { fields, fieldErrors }

  if (Object.values(fieldErrors).some(Boolean))
    return new Response(JSON.stringify(actionData), {
      status: 400,
    })

  const isCreate = await createPost({
    title,
    desc: excerpt,
    body,
    user_name: 'jah',
  })
  if (isCreate) return new Response(undefined, { status: 200 })

  return badRequest('Server Error!', 500)
}

export const put: APIRoute = async ({ request, cookies }) => {
  if (request.headers.get('Content-Type') !== 'application/json')
    return badRequest()

  const { title, excerpt, body, csrfToken: csrf, postId } = await request.json()

  if (
    typeof title !== 'string' ||
    typeof excerpt !== 'string' ||
    typeof body !== 'string' ||
    typeof csrf !== 'string' ||
    typeof postId !== 'string'
  ) {
    return badRequest()
  }

  if (csrf !== cookies.get('csrf').value) {
    return badRequest()
  }

  if (
    !compareHashAndPassword({
      method: 'keccak256',
      hash: cookies.get(import.meta.env.LOGIN_COOKIE).value,
      session: import.meta.env.SESSION,
    })
  ) {
    return badRequest()
  }

  const fields = { title, excerpt, body }
  const fieldErrors = {
    title: validateInput(title),
    excerpt: validateInput(excerpt),
    body: validateInput(body),
  }

  const actionData: actionData = { fields, fieldErrors }

  if (Object.values(fieldErrors).some(Boolean))
    return new Response(JSON.stringify(actionData), {
      status: 400,
    })

  const isUpdated = await updatePost(postId, {
    title: fields.title,
    desc: fields.excerpt,
    body: fields.body,
  })

  if (isUpdated) return new Response(null, { status: 200 })
  return new Response(null, { status: 500 })
}

export const del: APIRoute = async ({ request, cookies }) => {
  if (request.headers.get('Content-Type') !== 'application/json')
    return badRequest()

  const { postId, csrf } = await request.json()

  if (typeof postId !== 'string' || typeof csrf !== 'string') {
    return badRequest()
  }

  if (csrf !== cookies.get('csrf').value) {
    return badRequest()
  }

  if (await deletePost(postId)) {
    return new Response(null, { status: 200 })
  } else {
    return new Response(null, { status: 500 })
  }
}
