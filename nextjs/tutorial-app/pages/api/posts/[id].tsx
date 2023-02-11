import type { NextApiRequest, NextApiResponse } from 'next'
import { validateInputField } from '../../../app/utility/formValidators'
import { deletePost, updatePost } from '../../../lib/crud'

export type ActionDataT = {
  formError?: string
  fieldsErrors?: {
    title?: string
    desc?: string
    text?: string
  }
  fields?: {
    title?: string
    desc?: string
    text?: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActionDataT>
) {
  const id = req.query.id
  if (typeof id !== 'string') return res.status(400).end()

  if (req.method === 'DELETE') {
    try {
      await deletePost(id)
    } catch {
      return res.status(500).end()
    }

    try {
      res.revalidate('/')
    } catch {}

    return res.status(200).end()
  }

  const { text, desc, title } = req.body
  if (
    typeof text !== 'string' ||
    typeof desc !== 'string' ||
    typeof title !== 'string'
  )
    return res.status(400).json({ formError: 'Form submited wrong.' })

  const fieldsErrors = {
    title: validateInputField(title),
    desc: validateInputField(desc),
    text: validateInputField(text),
  }

  if (Object.values(fieldsErrors).some(Boolean))
    return res.status(400).json({ fieldsErrors })

  try {
    await updatePost(id, { title, desc, text })
  } catch (e) {
    return res.status(500).json({ formError: 'Something gone wrong!' })
  }

  try {
    await res.revalidate('/')
    await res.revalidate('/posts/' + id)
  } catch {}

  return res.status(200).end()
}
