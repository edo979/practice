import { Link } from '@remix-run/react'

type JokeComponentProps = {
  id: string
  name: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function JokeComponent({
  id,
  name,
  content,
  createdAt,
  updatedAt,
}: JokeComponentProps) {
  const toLocalTime = (dateString: string) => {
    const date = new Date(dateString)
    const dateParts = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ]
    const formatedDateParts = dateParts.map((part) =>
      part < 9 ? `0${part}` : part.toString()
    )
    const [month, day, year, hour, minutes, seconds] = formatedDateParts
    return `${day}.${month}.${year} / ${hour}:${minutes}:${seconds}`
  }

  return (
    <div className="card h-100">
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
          <hr />

          <Link
            to={`${id}`}
            className="btn btn-sm btn-outline-secondary ms-auto px-3"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}
