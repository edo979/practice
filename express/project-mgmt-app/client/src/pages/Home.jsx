import Clients from '../components/Clients'
import AddClient from '../components/AddClient'
import Projects from '../components/Projects'

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClient />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  )
}
