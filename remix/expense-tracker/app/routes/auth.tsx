import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { UserDataRawT, authCookie, createAccount } from '~/auth/auth.server'
import AuthForm from '~/components/AuthForm'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const userData = Object.fromEntries(formData) as UserDataRawT
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode')

  if (mode === 'sign-up') {
    //TODO: validate user data

    const userId = await createAccount({
      email: userData.email!,
      password: userData.password!,
    })

    return redirect('/', {
      headers: {
        'Set-Cookie': await authCookie.serialize(userId),
      },
    })
  } else {
    // TODO: validate user data for login
  }

  return null
}

export default function Auth() {
  return <AuthForm />
}
