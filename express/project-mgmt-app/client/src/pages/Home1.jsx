import { json, useLoaderData } from 'react-router-dom'
import AddClient from '../components/AddClient1'
import AddProject from '../components/AddProject1'
import Projects from '../components/Projects1'

export const loader = async () => {
  const res = await fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
      projects {
        id
        name
        status
      }
    }`,
    }),
  })

  const {
    data: { projects },
  } = await res.json()

  return { projects }
}

export default function Home() {
  const { projects } = useLoaderData()

  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClient />
        <AddProject />
      </div>
      <Projects projects={projects} />
      <hr />
    </>
  )
}
