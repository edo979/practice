import { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => ({
  description: 'Blog paga about bloging.',
})

export default function Index() {
  return (
    <div className="p-4 p-md-5 my-4 rounded text-bg-dark row">
      <div className="col-md-7 px-0">
        <h1 className="display-4 fst-italic">
          Title of a longer featured blog post
        </h1>
        <p className="lead my-3">
          Multiple lines of text that form the lede, informing new readers
          quickly and efficiently about what’s most interesting in this post’s
          contents.
        </p>
        <p className="lead mb-0">
          <a href="#" className="text-white fw-bold">
            Continue reading...
          </a>
        </p>
      </div>
      <div className="col-md-5 d-none d-md-block">
        <svg
          version="1.1"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0 -952.36)">
            <circle cx="50" cy="1002.4" r="45.669" fill="#252525" />
            <g transform="matrix(.82431 0 0 .82431 11.917 184.81)">
              <rect
                x="14.38"
                y="1013.1"
                width="31.649"
                height="2.4528"
                ry="1.2264"
                fill="#fff"
              />
              <rect
                transform="matrix(.86603 .5 -.5 .86603 0 0)"
                x="541.4"
                y="804.81"
                width="13.826"
                height="38.28"
                ry="1.1233"
                fill="#fff"
              />
              <path
                d="m47.249 1014.8c-0.37998-0.2194-0.24398-1.3056-0.24398-1.3056l0.21428-2.0994 0.21435-2.0995 0.21428-2.0993 0.21432-2.0994 0.21428-2.0994 0.21435-2.0994 0.21428-2.0994 1.4967 0.8641 1.4967 0.8641 1.4967 0.8641 1.4967 0.8641 1.4967 0.8641 1.4967 0.8641 1.4967 0.8641 1.4967 0.8641-1.711 1.2353-1.711 1.2353-1.711 1.2353-1.711 1.2353-1.711 1.2353-1.711 1.2353-1.711 1.2353s-0.87272 0.6609-1.2527 0.4415z"
                fill="#fff"
              />
              <rect
                transform="matrix(.86603 .5 -.5 .86603 0 0)"
                x="541.06"
                y="839.05"
                width="14.496"
                height="1.4942"
                ry="0"
                fill="#252525"
              />
              <rect
                transform="matrix(.86603 .5 -.5 .86603 0 0)"
                x="541.17"
                y="807.37"
                width="14.496"
                height="1.4942"
                ry="0"
                fill="#252525"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
