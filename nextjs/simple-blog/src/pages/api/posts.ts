import { createPost, deletePost, editPost } from '@/lib/postsModel'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import authOptions from './auth/[...nextauth]'
import { getCsrfToken } from 'next-auth/react'

export type Data = {
  formError?: string
  fieldsError?: {
    title?: string
    desc?: string
    body?: string
  }
  fields?: {
    title?: string
    desc?: string
    body?: string
  }
}

function validateInput(input: string) {
  if (input.length < 3) {
    return 'Minimum 3 charachters, input more please.'
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1000)
  // })
  const session = (await unstable_getServerSession(req, res, authOptions)) as {
    user: { name: string }
  }
  const csrfToken = await getCsrfToken({ req })

  if (!session) return res.status(401).end()

  if (req.method === 'POST') {
    const { title, desc, body, csrf } = req.body

    if (csrf !== csrfToken)
      return res.status(401).json({ formError: 'Error submiting form!' })

    if (
      typeof title !== 'string' ||
      typeof desc !== 'string' ||
      typeof body !== 'string'
    ) {
      return res.status(400).json({ formError: 'Form submited wrong' })
    }

    const fields = { title, desc, body }
    const fieldsError = {
      title: validateInput(title),
      desc: validateInput(desc),
      body: validateInput(body),
    }

    if (Object.values(fieldsError).some(Boolean)) {
      return res.status(400).json({ fields, fieldsError })
    }

    try {
      const user_name = session.user.name
      await createPost({ title, desc, body, user_name })
      return res.status(200).end()
    } catch {
      return res.status(500).end()
    }
  } else if (req.method === 'PATCH') {
    const { id, title, desc, body, csrf } = req.body

    if (csrf !== csrfToken)
      return res.status(401).json({ formError: 'Error submiting form!' })

    if (
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof desc !== 'string' ||
      typeof body !== 'string'
    ) {
      return res.status(400).json({ formError: 'Form submited wrong' })
    }

    const fields = { title, desc, body }
    const fieldsError = {
      title: validateInput(title),
      desc: validateInput(desc),
      body: validateInput(body),
    }

    if (Object.values(fieldsError).some(Boolean)) {
      return res.status(400).json({ fields, fieldsError })
    }

    try {
      await editPost({ id, title, desc, body })
      return res.status(200).end()
    } catch {
      return res.status(500).end('patch error')
    }
  } else if (req.method === 'DELETE') {
    const { id, reqCsfrToken } = req.body
    if (reqCsfrToken !== csrfToken) return res.status(401).end()

    try {
      await deletePost(id)
      return res.status(200).end()
    } catch {
      return res.status(500).end()
    }
  }
}
