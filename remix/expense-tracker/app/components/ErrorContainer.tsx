import { Link } from '@remix-run/react'
import React, { PropsWithChildren } from 'react'

function ErrorContainer({
  title,
  message,
  redirectTo,
}: {
  title: string
  redirectTo?: string
  message?: string
}) {
  return (
    <div className="mt-5 col-8 mx-auto">
      <div className="alert alert-danger" role="alert">
        <h3 className="alert-heading text-center mb-3">⚠️ {title}</h3>

        <p>
          Aww yeah, an error occurred! <i>{message}.</i>
        </p>

        <hr />
        <p className="mb-0">
          <Link to={redirectTo || '/'} className="alert-link">
            Back to safety.
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ErrorContainer
