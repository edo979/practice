import LoginForm from '@/Components/LoginForm'
import Link from 'next/link'

export default async function LoginRoute() {
  return (
    <main className="mx-auto mt-8 prose w-80">
      <h1>Login:</h1>
      <LoginForm />
      <p className="mb-16 text-sm">
        Don&lsquo;t have account, register <Link href={'/signin'}>here...</Link>
      </p>
    </main>
  )
}
