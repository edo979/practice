import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">
          Expenses Tracker
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Quickly and easy menage and see your expenses with this expense
            tracker application. Enter date and amount of your expense to see in
            the easiest way possible your expense and understand how much money
            you save every month.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/expenses" className="btn btn-primary btn-lg px-4 gap-3">
              Menage Expenses
            </Link>
            <Link to="/auth" className="btn btn-outline-secondary btn-lg px-4">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="row flex-lg-row-reverse align-items-center g-5 py-5 mt-lg-2">
        <div className="col-10 col-sm-8 col-lg-6 mx-auto me-lg-0 mt-lg-0">
          <picture className="d-block mx-lg-auto">
            <source srcSet="/images/charts-lg.jpg" media="(min-width: 600px)" />
            <img
              src="/images/charts-md.jpg"
              alt="Bootstrap Themes"
              width="500"
              className="img-fluid"
            />
          </picture>
        </div>
        <div className="col-lg-6 mt-lg-0">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Responsive left-aligned hero with image
          </h1>
          <p className="lead">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2"
            >
              Primary
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Default
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
