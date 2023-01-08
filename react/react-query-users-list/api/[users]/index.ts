import type { VercelRequest, VercelResponse } from '@vercel/node'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import User from '../../src/schemas/User'
dotenv.config()
mongoose.set('strictQuery', false)

export default async (request: VercelRequest, response: VercelResponse) => {
  let DB_URI = process.env.MONGO_URI

  if (!DB_URI) {
    return response.status(500).send('Error on server')
  }
  if (request.method === 'GET') {
    await mongoose.connect(DB_URI)

    let limit = request.query?.limit as string
    if (!limit) {
      limit = '2'
    }

    const usersCount = await User.count()
    const pageCount = Math.ceil(usersCount / 5)
    const skipPage = 0

    const users = await User.find()
      .select('_id name')
      .limit(parseInt(limit))
      .skip(skipPage)
      .exec()

    return response.status(200).json({ users, pageCount })
  } else if (request.method === 'POST') {
    await mongoose.connect(DB_URI)

    const { name } = request.body
    if (!name) return response.status(400).end()

    const user = await User.create({ name })
    return response.status(200).json(user)
  }

  return response.status(405).end()
}
