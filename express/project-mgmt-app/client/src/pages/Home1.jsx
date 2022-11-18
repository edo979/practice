import AddClient from '../components/AddClient1'
import AddProject from '../components/AddProject1'
import Projects from '../components/Projects1'

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClient />
        <AddProject />
      </div>
      <Projects />
      <hr />
    </>
  )
}
