import { ActionFunction, Navigate } from 'react-router-dom'

export const action: ActionFunction = async ({ params }) => {
  const noteId = params.noteId
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/notes`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ noteId }),
  })

  if (res.status === 500) {
    const { message } = await res.json()
    throw new Error(message)
  }
}

export default function DeleteNote() {
  return <Navigate to={'/'} />
}
