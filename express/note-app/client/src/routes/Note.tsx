import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom'
import { Note as NoteType } from './Home'

type LoaderData = {
  note: NoteType
}

export const loader: LoaderFunction = async ({ params }) => {
  const noteId = params.noteId
  if (!noteId) throw new Error('Note not found!')

  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/notes/${noteId}`)

  if (res.status === 404) {
    const { message } = await res.json()
    throw new Error(message)
  }
  if (!res.ok) throw new Error('Error on server, sorry.')

  const note = await res.json()
  return { note }
}

export default function Note() {
  const { note } = useLoaderData() as LoaderData

  return <div>{note.title}</div>
}
