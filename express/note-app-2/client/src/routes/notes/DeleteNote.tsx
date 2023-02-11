import { ActionFunction, Navigate, redirect } from 'react-router-dom'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const noteId = formData.get('noteId')
  if (!noteId) return redirect('..')

  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/notes`, {
    method: 'delete',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ noteId }),
  })

  if (!res.ok) throw new Error('Error when try to delete note')

  return redirect('/user/dashboard')
}

export default function DeleteNote() {
  return <Navigate to="/" />
}
