import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node'
import { checkNoteUser, deleteNote } from '~/models/notes.server'
import { getUserId } from '~/sessions.server'

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/login')

  const noteId = params.noteId
  if (!noteId) throw new Error('Error reading note')

  const isUserNote = await checkNoteUser({ userId, noteId })
  if (!isUserNote) throw new Response('Is not user note', { status: 403 })

  try {
    await deleteNote(noteId)
  } catch {
    throw new Error('Error when trying to delete note.')
  }

  return redirect('/dashboard')
}

export const loader: LoaderFunction = async () => {
  return redirect('/')
}
