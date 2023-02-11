import { useMemo, useState } from 'react'
import { Link, LoaderFunction, redirect, useLoaderData } from 'react-router-dom'
import Select from 'react-select'

type ActionData = {
  user: {
    usernName: string
    notes: Note[]
  }
  tags: Tag[]
}

export type Tag = {
  label: string
}

export type Note = {
  _id: string
  title: string
  body: string
  tags: Tag[]
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/notes`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!res.ok) {
    if (res.status >= 500) {
      throw new Error('Server Error')
    }
    return redirect('/login')
  }
  const user = await res.json()

  const tagRes = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const { tags } = await tagRes.json()

  return { user, tags } as ActionData
}

export default function NotesList() {
  const { user, tags } = useLoaderData() as ActionData
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const notes = useMemo(() => {
    return user.notes.filter(
      (note) =>
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((selectedTag) =>
            note.tags.some((noteTag) => noteTag.label === selectedTag.label)
          ))
    )
  }, [title, selectedTags])

  return (
    <>
      <div className="row">
        <div className="col-6">
          <label htmlFor="title" className="form-label">
            Note Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Find note..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-6">
          <label htmlFor="tag" className="form-label">
            Tags
          </label>
          <Select
            id="tag"
            isMulti
            options={tags.map((tag) => ({
              label: tag.label,
              value: tag.label,
            }))}
            value={selectedTags.map((tag) => ({
              value: tag.label,
              label: tag.label,
            }))}
            onChange={(tags) =>
              setSelectedTags(
                tags.map((tag) => ({ label: tag.label, value: tag.label }))
              )
            }
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-col-4 mt-4 g-3">
        {notes.map((note) => (
          <div className="col" key={note.title}>
            <Link
              to={`notes/${note._id}`}
              className="text-decoration-none text-reset"
            >
              <div className="card h-100 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <div className="card-text hstack gap-1 justify-content-center flex-wrap">
                    {note.tags.map((tag) => (
                      <span className="badge bg-primary" key={tag.label}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
