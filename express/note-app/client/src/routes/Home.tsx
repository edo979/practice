import { LoaderFunction, useLoaderData } from 'react-router-dom'

export type Note = {
  _id: string
  title: string
  body: string
}

type LoaderData = {
  notes: Note[]
}

export const loader: LoaderFunction = async () => {
  const res = await fetch('http://localhost:5000/')
  const notes: Note[] = await res.json()

  return { notes }
}

export default function Home() {
  const { notes } = useLoaderData() as LoaderData
  console.log(notes)

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Home</h1>
        </div>
      </div>
    </>
  )
}
