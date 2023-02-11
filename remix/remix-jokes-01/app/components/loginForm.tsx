import { Link } from '@remix-run/react'

export default function LoginForm() {
  return (
    <div className="text-end mb-3 mb-sm-0 ms-3 ms-sm-0">
      <Link to="/login" className="btn btn-outline-light me-2">
        Login
      </Link>
      <Link
        to="/login?logintype=register"
        type="button"
        className="btn btn-warning"
      >
        Sign-up
      </Link>
    </div>
  )
}
