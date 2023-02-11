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

  if (request.method === 'DELETE') {
    try {
      await mongoose.connect(DB_URI)
      await User.findByIdAndDelete(request.query)
      return response.status(200).end()
    } catch {
      return response.status(500).send('Error on server')
    }
  } else if (request.method === 'PATCH') {
    try {
      await mongoose.connect(DB_URI)
      const { name } = request.body
      if (!name) return response.status(400).end()

      const user = await User.findByIdAndUpdate(
        request.query,
        { name },
        { new: true }
      ).exec()
      return response.status(200).json(user)
    } catch {
      return response.status(500).send('Error on server')
    }
  }

  return response.status(405).end()
}
