import { Link } from '@remix-run/react'
import { toLocalTime } from '~/utils/dateToString'

type JokeComponentProps = {
  id: string
  name: string
  content: string
  createdAt: string
  updatedAt: string
  paginationPage: number
}

export default function JokeComponent({
  id,
  name,
  content,
  createdAt,
  updatedAt,
  paginationPage,
}: JokeComponentProps) {
  return (
    <>
      <div className="card h-100">
        <h5 className="card-header">
          <form
            action={`/admin/jokes/${id}`}
            method="post"
            className="hstack"
            onSubmit={(e) => {
              if (!confirm('This joke will be deleted. Are you shure?')) {
                e.preventDefault()
              }
            }}
          >
            <input type="hidden" name="_method" value="delete" />

            <div className="btn-group ms-auto">
              <Link
                to={`${id}?page=${paginationPage}`}
                className="btn btn-sm btn-outline-secondary ms-auto px-3"
              >
                Edit
              </Link>
              <button
                className="btn btn-sm btn-outline-secondary"
                type="submit"
              >
                X
              </button>
            </div>
          </form>
        </h5>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{content}</p>
        </div>
        <div className="card-footer">
          <div className="vstack">
            <small className="text-muted text-end">
              Created at: {toLocalTime(createdAt)}
            </small>

            <small className="text-muted text-end">
              Last update: {toLocalTime(updatedAt)}
            </small>
          </div>
        </div>
      </div>
    </>
  )
}
