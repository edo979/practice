import { Form, LoaderFunction, redirect, useLoaderData } from 'react-router-dom'
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
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/notes`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!res.ok) return redirect('/login')
  const user = await res.json()
  return { user } as ActionData
}

export default function Dashboard() {
  const { user } = useLoaderData() as ActionData

  return (
    <main className="container-fluid vh-100">
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol id="home" viewBox="0 0 16 16" fill="currentcolor">
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
        </symbol>
        <symbol id="speedometer2" viewBox="0 0 16 16" fill="currentcolor">
          <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"></path>
          <path
            fillRule="evenodd"
            d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
          ></path>
        </symbol>
        <symbol id="people-circle" viewBox="0 0 16 16" fill="currentcolor">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          ></path>
        </symbol>
      </svg>
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
              />

              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </Form>

            <div className="col-6">tags</div>
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
