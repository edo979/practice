import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
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

  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/notes/${params.noteId}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    }
  )
  if (res.status !== 302) throw new Error('Form update error')
  return redirect('..')
}

export const loader: LoaderFunction = async ({ params }) => {
  const noteId = params.noteId

  const tagsRes = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const tags: Tag[] = await tagsRes.json()
  const noteRes = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/notes/${noteId}`
  )
  const note: Note = await noteRes.json()

  return { tags, note } as LoaderData
}

export default function EditNote() {
  const { tags, note } = useLoaderData() as LoaderData
  let errors = useActionData() as ActionData
  const navigation = useNavigation()

  if (errors === undefined) {
    errors = {
      fields: {
        body: note.body,
        title: note.title,
        tags: note.tags.map((tag) => tag._id),
      },
    }
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
            navigationState={navigation.state}
          />
        </div>
      </div>
    </div>
  )
}
