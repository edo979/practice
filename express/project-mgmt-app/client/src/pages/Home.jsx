import Clients from '../components/Clients'
import AddClient from '../components/AddClient'
import AddProject from '../components/AddProject'
import Projects from '../components/Projects'

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClient />
        <AddProject />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  )
}
