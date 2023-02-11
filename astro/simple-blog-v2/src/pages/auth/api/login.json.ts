import { APIRoute } from 'astro'
import { getUser } from '../../../db/users'
import { hashWithKeccak256, compareHashAndPassword } from 'node-hash-password'

export const post: APIRoute = async ({ request, cookies }) => {
  const cookieName = import.meta.env.LOGIN_COOKIE

  if (request.headers.get('Content-Type') !== 'application/json')
    return new Response(null, { status: 400 })

  const { username, password } = await request.json()

  if (typeof username !== 'string' || typeof password !== 'string') {
    return new Response(JSON.stringify({ formError: 'Form submitet wrong' }), {
      status: 400,
    })
  }

  const user = await getUser(username)
  if (!user)
    return new Response(JSON.stringify({ formError: 'Form submited wrong.' }), {
      status: 400,
    })

  const isPasswordCorrect = compareHashAndPassword({
    method: 'keccak256',
    hash: user.password,
    password: password,
  })

  if (username === user.username && isPasswordCorrect) {
    cookies.set(
      cookieName,
      hashWithKeccak256({ session: import.meta.env.SESSION }),
      {
        httpOnly: true,
        expires: new Date(Date.now() + 3600 * 1000 * 24),
        sameSite: 'strict',
        path: '/auth',
      }
    )

    return new Response(null, { status: 200 })
  }

  return new Response(
    JSON.stringify({
      formError: 'Something went wrong.',
    }),
    { status: 400 }
  )
}
