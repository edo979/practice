import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <>
      <h1>Index route</h1>
      <ul>
        <Link to="expenses">Got to expenses</Link>
      </ul>
    </>
  )
}
