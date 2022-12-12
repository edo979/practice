import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom'
import { Note as NoteModel } from './NotesList'

type LoaderData = {
  note: NoteModel
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const noteId = params.noteId
  if (!noteId) throw new Error("That note doesn't exist!")

  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/user/notes/${noteId}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  )

  if (!res.ok) {
    if (res.status >= 500) {
      throw new Error('Server Error')
    }
    return redirect('/login')
  }

  const note = await res.json()

  return { note } as LoaderData
}

export default function Note() {
  const { note } = useLoaderData() as LoaderData

  return <div>Note</div>
}
