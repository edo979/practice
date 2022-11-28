import { Link, LoaderFunction, useLoaderData } from 'react-router-dom'
import style from './styles/home.module.css'

export type Note = {
  _id: string
  title: string
  body: string
}

type LoaderData = {
  notes: Note[]
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/`)
  const notes: Note[] = await res.json()

  return { notes }
}

export default function Home() {
  const { notes } = useLoaderData() as LoaderData

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Home</h1>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-4">
        {notes.map((note) => (
          <div key={note._id} className="col">
            <Link
              to={note._id}
              className="text-decoration-none text-reset"
              state={note}
            >
              <div className={`card h-100 text-center ${style.hover}`}>
                <div className="card-body">
                  <h2 className="card-title h5">{note.title}</h2>
                  <p className="card-text">
                    <i className="badge text-bg-primary">jah</i>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
