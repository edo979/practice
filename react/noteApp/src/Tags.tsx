import { ActionFunction, Navigate, redirect } from 'react-router-dom'
import { deleteTag, getTags, saveTags } from './data/model'

export const editTagAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const tagId = formData.get('_id')
  const tagLabel = formData.get('tag')
  if (
    typeof tagId !== 'string' ||
    tagId === '' ||
    typeof tagLabel !== 'string' ||
    tagLabel === ''
  )
    return redirect('/')

  const tags = getTags()
  const newTags = tags.map((tag) => {
    if (tag.id === tagId) {
      tag.label = tagLabel
    }

    return tag
  })

  saveTags(newTags)
}
export const deleteTagAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const tagId = formData.get('_id')
  if (typeof tagId !== 'string' || tagId === '') return redirect('/')

  deleteTag(tagId)
}

export default function Tags() {
  return <Navigate to="/" />
}
