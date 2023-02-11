import type { NextApiRequest, NextApiResponse } from 'next'
import { validateInputField } from '../../../app/utility/formValidators'
import { createPost } from '../../../lib/crud'

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
    await createPost({ title, desc, text })
  } catch {
    return res.status(500).end()
  }

  try {
    res.revalidate('/')
  } catch {}

  return res.status(200).end()
}
