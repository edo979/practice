import type { VercelRequest, VercelResponse } from '@vercel/node'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import User from '../src/schemas/User'
dotenv.config()
mongoose.set('strictQuery', false)

export default async (request: VercelRequest, response: VercelResponse) => {
  if (!process.env.MONGO_URI) {
    return response.status(500).send('Error on server')
  }
  await mongoose.connect(process.env.MONGO_URI)
  const users = await User.find()

  response.status(200).json(users)
}
