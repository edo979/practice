import { useMemo, useState } from 'react'
import {
  Form,
  LoaderFunction,
  NavLink,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import Select from 'react-select'
import classes from '../../styles/dashboard.module.css'

type ActionData = {
  user: {
    usernName: string
    notes: Note[]
  }
  tags: Tag[]
}

type Tag = {
  label: string
}

type Note = {
  title: string
  body: string
  tags: Tag[]
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/notes`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!res.ok) return redirect('/login')
  const user = await res.json()

  const tagRes = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const { tags } = await tagRes.json()

  return { user, tags } as ActionData
}

export default function Dashboard() {
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
    <main className="container-fluid vh-100">
      <div className="row">
        <nav className="py-2 d-sm-none bg-dark navbar navbar-dark">
          <div className="container">
            <div className="navbar-brand">Note App</div>
            <button
              className="navbar-toggler collapsed ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ right: '0' }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>

      <div className="row">
        <nav
          id="sidebarMenu"
          className={`${classes.sidebar} col-sm-4 col-md-3 d-sm-block text-bg-dark sidebar collapse`}
        >
          <div className="position-sticky pt-3 sidebar-sticky">
            <a
              href="/"
              className="d-none d-sm-block d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-4">Note App</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    `nav-link ${isActive && 'active'}`
                  }
                >
                  <i style={{ verticalAlign: '0.125em' }}>
                    <svg className="pe-none me-2" width="16" height="16">
                      <use xlinkHref="#speedometer2"></use>
                    </svg>
                  </i>
                  Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="new"
                  className={({ isActive }) =>
                    `nav-link text-white ${isActive && 'active'}`
                  }
                >
                  <i style={{ verticalAlign: '0.125em' }}>
                    <svg className="pe-none me-2" width="16" height="16">
                      <use xlinkHref="#circle-plus"></use>
                    </svg>
                  </i>
                  New Note
                </NavLink>
              </li>

              <hr />

              <li>
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    `nav-link text-white ${isActive && 'active'}`
                  }
                >
                  <svg className="bi pe-none me-2" width="16" height="16">
                    <use xlinkHref="#people-circle"></use>
                  </svg>
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="ms-sm-auto col-12 col-sm-8 col-md-9 g-4">
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

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-col-4 mt-4">
            {notes.map((note) => (
              <div className="col" key={note.title}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
