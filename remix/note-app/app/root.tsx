import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react'
import React from 'react'

export const links: LinksFunction = () => {
  return [
    {
      as: 'style',
      rel: 'stylesheet preload prefetch',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
      integrity:
        'sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD',
      crossOrigin: 'anonymous',
    },
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
})

function Document({
  children,
  title = 'Note app',
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
          crossOrigin="anonymous"
        ></script>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title={'Page Error'}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="alert alert-danger mt-5" role="alert">
              <h1>Aplication Error</h1>
              <i>{error.message}</i>
              <hr />
              <Link to="/">
                <button className="btn btn-secondary">Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Document>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="alert alert-danger mt-5" role="alert">
              <h1>Aplication Error</h1>
              <i>
                {caught.status} {caught.statusText}
              </i>
              <hr />
              <Link to="/">
                <button className="btn btn-secondary">Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Document>
  )
}
