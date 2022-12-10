import { Form, LoaderFunction, redirect, useLoaderData } from 'react-router-dom'
import Select from 'react-select'
import classes from '../../styles/dashboard.module.css'

type ActionData = {
  user: {
    usernName: string
    notes: [
      {
        title: string
        body: string
        tags: [{ label: string }]
      }
    ]
  }
  tags: string[]
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/notes`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!res.ok) return redirect('/login')
  const user = await res.json()

  const tagRes = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const tagsRaw = (await tagRes.json()) as { tags: [{ label: string }] }
  const tags = tagsRaw.tags.map((tag) => tag.label)

  return { user, tags } as ActionData
}

export default function Dashboard() {
  const { user, tags } = useLoaderData() as ActionData

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
                <a href="#" className="nav-link active" aria-current="page">
                  <i style={{ verticalAlign: '0.125em' }}>
                    <svg className="pe-none me-2" width="16" height="16">
                      <use xlinkHref="#speedometer2"></use>
                    </svg>
                  </i>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <svg className="bi pe-none me-2" width="16" height="16">
                    <use xlinkHref="#people-circle"></use>
                  </svg>
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="ms-sm-auto col-12 col-sm-8 col-md-9 g-4">
          <div className="row">
            <Form className="col-6 hstack gap-2">
              <input
                type="text"
                id="search"
                name="q"
                className="form-control"
                placeholder="Find note..."
              />

              <button className="btn btn-primary" type="submit">
                <svg className="pe-none mb-1" width="16" height="16">
                  <use xlinkHref="#search-icon"></use>
                </svg>
              </button>
            </Form>

            <div className="col-6">
              <Select
                isMulti
                options={tags.map((tag) => ({ label: tag, value: tag }))}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-col-4 mt-4">
            {user.notes.map((note) => (
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
