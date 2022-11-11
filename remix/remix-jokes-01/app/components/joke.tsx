import { ActionFunction, json } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { useState } from 'react'
import { toLocalTime } from '~/utils/dateToString'

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
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      {isEditing ? (
        <div className="d-grid align-items-center">
          <Form method="post">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              defaultValue={name}
              className="form-control"
            />
            <label className="form-label mt-2" htmlFor="content">
              Joke:
            </label>
            <textarea
              className="form-control"
              name="content"
              defaultValue={content}
              rows={5}
            />
            <div className="hstack mt-1">
              <button
                type="submit"
                className="btn btn-sm btn-success ms-auto px-3"
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      ) : (
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

              <button
                className="btn btn-sm btn-outline-secondary ms-auto px-3"
                onClick={(e) => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
