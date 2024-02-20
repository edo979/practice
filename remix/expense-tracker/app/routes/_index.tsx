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
          <img
            src="/images/hero-charts.png"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width="700"
            height="500"
            loading="lazy"
          />
          <div className="text-center opacity-50">
            <small>
              Image by{' '}
              <a href="https://pixabay.com/users/clker-free-vector-images-3736/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=297122">
                Clker-Free-Vector-Images
              </a>{' '}
              from{' '}
              <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=297122">
                Pixabay
              </a>
            </small>
          </div>
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
