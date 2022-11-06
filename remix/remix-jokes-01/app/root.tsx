import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import Header from './components/header'
import { getUser } from './utils/session.server'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
      integrity:
        'sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi',
      crossOrigin: 'anonymous',
    },
  ]
}
type LoaderData = {
  user: {
    id: string
    username: string
  } | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  console.log(user)

  const data = { user }
  return json<LoaderData>(data)
}

export default function App() {
  const { user } = useLoaderData<LoaderData>()
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header user={user} />

        <main className="container">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
        <LiveReload />
      </body>
    </html>
  )
}
