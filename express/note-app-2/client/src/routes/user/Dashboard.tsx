import { NavLink, Outlet } from 'react-router-dom'
import classes from '../../styles/dashboard.module.css'

export default function Dashboard() {
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
                  end
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
                  to="notes/new"
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
          <Outlet />
        </div>
      </div>
    </main>
  )
}
