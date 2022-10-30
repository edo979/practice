import { Link } from '@remix-run/react'

export default function AdminIndex() {
  return (
    <Link to={'new'} className="btn btn-outline-dark">
      New
    </Link>
  )
}
