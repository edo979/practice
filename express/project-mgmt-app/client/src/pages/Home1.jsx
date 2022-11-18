import { useLoaderData } from 'react-router-dom'
import AddClient from '../components/AddClient1'
import AddProject from '../components/AddProject1'
import Projects from '../components/Projects1'

export const loader = async () => {
  const projects = [
    { id: 1, name: 'Project' },
    { id: 2, name: 'Project1' },
  ]

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
