import { ActionFunction, LoaderFunction, useLoaderData } from 'react-router-dom'
import NoteForm from '../components/NoteForm'
import { Tag } from './Home'

type LoaderData = {
  tags: Tag[]
}

export const action: ActionFunction = async ({ request, params }) => {
  console.log('action')
}

export const loader: LoaderFunction = async ({ params }) => {
  const noteId = params.noteId

  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const tags = await res.json()

  return { tags } as LoaderData
}

export default function EditNote() {
  const { tags } = useLoaderData() as LoaderData
  return (
    <div className="row">
      <div className="col-12">
        <h1>Edit Note:</h1>

        <div className="col">
          <NoteForm
            isEdit={true}
            tags={tags}
            errors={{}}
            navigationState="idle"
          />
        </div>
      </div>
    </div>
  )
}
