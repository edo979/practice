import { createUser } from '@/lib/usersModel'
import type { NextApiRequest, NextApiResponse } from 'next'

export type Data = {
  formError?: string
  fields?: {
    username?: string
    password?: string
  }
  fieldsError?: {
    username?: string
    password?: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password } = req.body
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ formError: 'Form submitet wrong.' })
  }
  const fields = {
    username,
    password,
  }
  const fieldsError = {
    username: username.length < 6 ? 'Minimum is 6 charachters' : undefined,
    password: password.length < 6 ? 'Minimum is 6 charachters' : undefined,
  }
  if (Object.values(fieldsError).some(Boolean)) {
    return res.status(400).json({ fields, fieldsError })
  }
  const isCreated = await createUser({ username, password })
  if (!isCreated)
    return res.status(400).json({ formError: 'Username already exist.' })

  res.status(200).end()
}
