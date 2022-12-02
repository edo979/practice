import {
  ActionFunction,
  LoaderFunction,
  useActionData,
  useLoaderData,
} from 'react-router-dom'
import NoteForm from '../components/NoteForm'
import { Note, Tag } from './Home'
import { ActionData } from './NewNote'

type LoaderData = {
  tags: Tag[]
  note: Note
}

function validateLength(data: string) {
  if (data.length < 6) return 'At least 6 charachters!'
}
function validateTags(tagsId: string[]) {
  if (tagsId.length === 0) return 'Please select one tag'
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const title = formData.get('title')
  const body = formData.get('body')
  const formTagsId = formData.getAll('tags') as string[]

  // Remove empty strings from array
  const labelsId = formTagsId.filter((id) => id !== '')

  // Validation
  if (typeof title !== 'string' || typeof body !== 'string') {
    return { formError: 'Form not submitet properly!' } as ActionData
  }

  const fieldErrors = {
    title: validateLength(title),
    body: validateLength(body),
    tags: validateTags(labelsId),
  }
  const fields = { title, body, tags: labelsId }

  if (Object.values(fieldErrors).some(Boolean)) {
    return { fieldErrors, fields } as ActionData
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const noteId = params.noteId

  const tagsRes = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const tags = await tagsRes.json()
  const noteRes = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const note = await noteRes.json()

  return { tags, note } as LoaderData
}

export default function EditNote() {
  const { tags, note } = useLoaderData() as LoaderData
  let errors = useActionData() as ActionData

  if (errors !== undefined) {
    errors = { fields: { body: note.body, title: note.title, tags: [] } }
  }

  return (
    <div className="row">
      <div className="col-12">
        <h1>Edit Note:</h1>

        <div className="col">
          <NoteForm
            isEdit={true}
            tags={tags}
            errors={errors}
            navigationState="idle"
          />
        </div>
      </div>
    </div>
  )
}
