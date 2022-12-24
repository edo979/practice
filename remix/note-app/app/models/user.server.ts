import { mongoose } from './db.server'
import bcrypt from 'bcryptjs'

interface IUser {
  id: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export const createUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user: IUser = await User.create({
    email,
    password: hashedPassword,
  })
  return user
}

export const getUserById = async (id: string) => {
  const user: IUser | null = await User.findById(id)
  return user
}
