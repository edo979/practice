import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { authCookie } from '~/auth/auth.server'
import { UserDataRawT, saveUser, getUser } from '~/data/user.server'
import { safeRedirect } from '~/auth/utils.server'
import AuthForm from '~/components/AuthForm'
import { validateUserCredentials } from '~/auth/validator'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const userData = Object.fromEntries(formData) as UserDataRawT
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode')
  const redirectTo = safeRedirect(searchParams.get('redirectTo'), '/expenses')

  if (mode === 'sign-up') {
    if (userData.password !== userData.password1)
      return { error: 'Form submitted wrong!' }

    try {
      const userCredentials = validateUserCredentials(userData)
      const userId = await saveUser(userCredentials)

      return redirect(redirectTo, {
        headers: {
          'Set-Cookie': await authCookie.serialize(userId),
        },
      })
    } catch (error) {
      if (error instanceof Error) throw new Error('Server error!')
      return error
    }
  } else if (mode === 'logout') {
    return redirect('/', {
      headers: {
        'Set-Cookie': await authCookie.serialize('', { maxAge: 0 }),
      },
    })
  } else {
    // LOGIN USER

    try {
      const userCredentials = validateUserCredentials(userData)
      const userId = await getUser(userCredentials)

      if (!userId) return { error: 'Wrong user credentials!' }

      return redirect(redirectTo, {
        headers: {
          'Set-Cookie': await authCookie.serialize(userId),
        },
      })
    } catch (error) {
      if (error instanceof Error) throw new Error('Server error!')
      return error
    }
  }
}

export default function Auth() {
  return <AuthForm />
}
