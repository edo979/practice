import mongoose from 'mongoose'
import User from '../schemas/User.js'

export default async function handler(request, response) {
  mongoose.set('strictQuery', false)
  await mongoose.connect(process.env.MONGO_URI)
  const users = await User.find()

  response
    .status(200)
    .json(users.map((user) => ({ id: user.id, name: user.name })))
}
