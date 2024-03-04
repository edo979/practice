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

    let userCredentials = null
    try {
      userCredentials = validateUserCredentials(userData)
    } catch (error) {
      return error
    }

    try {
      const userId = await saveUser(userCredentials)

      return redirect(redirectTo, {
        headers: {
          'Set-Cookie': await authCookie.serialize(userId),
        },
      })
    } catch (error) {
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

    let userCredentials = null
    try {
      userCredentials = validateUserCredentials(userData)
    } catch (error) {
      return error
    }

    const userId = await getUser({
      email: userData.email!,
      password: userData.password!,
    })

    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await authCookie.serialize(userId),
      },
    })
  }
}

export default function Auth() {
  return <AuthForm />
}
