import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'
import { Tag } from './Home'
import NoteForm from '../components/NoteForm'

export type ActionData = {
  formError?: string
  fieldErrors?: {
    title: string | undefined
    body: string | undefined
    tags: string | undefined
  }
  fields?: {
    title: string
    body: string
    tags: string[]
  }
}

type LoaderData = {
  tags: Tag[]
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

  // Tags
  const tagRes = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const tagsFromDB: Tag[] = await tagRes.json()
  const newLabels = labelsId.filter((id) => {
    const labelsIdFromDB = tagsFromDB.map((tag) => tag._id)
    return !labelsIdFromDB.includes(id)
  })

  // Add saved tagsId to Note
  const savedTagsId = labelsId.filter((id) =>
    tagsFromDB.map((tag) => tag._id).includes(id)
  )
  const noteTagsIds = [...savedTagsId]

  // Create new tags
  if (newLabels.length > 0) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: newLabels,
      }),
    })
    const newTagsId = await res.json()
    // Add new tags id to note
    noteTagsIds.push(...newTagsId)
  }

  // Note
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/notes/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, tags: noteTagsIds }),
  })

  if (res.status === 403) {
    const { message } = await res.json()
    return { formError: message }
  }

  return redirect('/')
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  const tags = await res.json()

  return { tags } as LoaderData
}

export default function NewNote() {
  const errors = useActionData() as ActionData
  const { tags } = useLoaderData() as LoaderData
  const navigation = useNavigation()

  return (
    <>
      <div className="row mt-4">
        <h1>Add new Note</h1>
      </div>

      <NoteForm
        errors={errors}
        tags={tags}
        navigationState={navigation.state}
        isEdit={false}
      />
    </>
  )
}
