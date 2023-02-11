import RegisterForm from '@/Components/RegisterForm'
import Link from 'next/link'

export default function SignInRoute() {
  return (
    <main className="mx-auto mt-8 prose w-80">
      <h1>Sign in:</h1>
      <RegisterForm />
      <p className="mb-16 text-sm">
        Have account, login <Link href={'/login'}>here...</Link>
      </p>
    </main>
  )
}
