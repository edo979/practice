import { ActionFunction, Navigate, redirect } from 'react-router-dom'
import { deleteTag } from './data/model'

export const editTagAction: ActionFunction = async () => {}
export const deleteTagAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const tagId = formData.get('_id')

  if (typeof tagId !== 'string' || tagId === '') return redirect('/')

  deleteTag(tagId)
}

export default function Tags() {
  return <Navigate to="/" />
}
