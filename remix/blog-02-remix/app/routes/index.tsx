import { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => ({
  description: 'Blog paga about bloging.',
})

export default function Index() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>MY blog</h1>
        </div>
      </div>
    </div>
  )
}
