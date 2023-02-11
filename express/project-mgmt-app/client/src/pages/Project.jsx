import { Link, useLoaderData, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

import ClientInfo from '../components/ClientInfo'
import DeleteProjectButton from '../components/DeleteProjectButton'
import EditProjectForm from '../components/EditProjectForm'

export const loader = async ({ params }) => {
  const projectId = params.projectId

  const res = await fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query getProject($id: ID!) {
          project(id: $id) {
            id
            name
            description
            status
            client {
              id
              name
              email
              phone
            }
          }
        }
      `,
      variables: { id: projectId },
    }),
  })

  const {
    data: { project },
  } = await res.json()

  return { project }
}

export default function Project() {
  const { project } = useLoaderData()

  return (
    <div className="mx-auto w-75 card p-5">
      <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
        Back
      </Link>

      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <h5 className="mt-3">Project Status:</h5>
      <p className="lead">{project.status}</p>

      <ClientInfo client={project.client} />

      {/* <EditProjectForm project={data.project} />

      <DeleteProjectButton projectId={data.project.id} /> */}
    </div>
  )
}
