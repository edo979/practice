import { useLoaderData } from 'react-router-dom'
import AddClient from '../components/AddClient1'
import AddProject from '../components/AddProject1'
import Clients from '../components/Clients1'
import Projects from '../components/Projects1'

export const loader = async () => {
  const [clients, projects] = await Promise.all([
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
        clients {
        id
        name
        email
        phone
        }
      }`,
      }),
    }).then((res) => res.json()),
    fetch('http://localhost:5000/graphql', {
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
    }).then((res) => res.json()),
  ]).then((values) => {
    return values.map((v) => v.data)
  })

  return { ...projects, ...clients }
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const clientId = formData.get('_clientId')

  await fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation  {
        deleteClient(id: "${clientId}") {
          id
          name
          email
          phone
        }
      }`,
    }),
  })
}

export default function Home() {
  const { projects, clients } = useLoaderData()

  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClient />
        <AddProject />
      </div>
      <Projects projects={projects} />
      <hr />
      <Clients clients={clients} />
    </>
  )
}
