import { ActionFunction, Navigate, redirect } from 'react-router-dom'
import { getRawNotes, saveRawNotes } from './data/model'

export const action: ActionFunction = async ({ params }) => {
  const noteId = params.noteId
  const notes = getRawNotes()

  const newNotes = notes.filter((note) => note.id !== noteId)

  saveRawNotes(newNotes)
  return redirect('/')
}

export default function DeleteNote() {
  return <Navigate to="/" replace={true} />
}
