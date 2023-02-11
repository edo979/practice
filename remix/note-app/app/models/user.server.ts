import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { deleteUserNotes } from './notes.server'

if (mongoose.models['User']) {
  delete mongoose.models['User']
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
})

const User = mongoose.model('User', userSchema)

export const createUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
      password: hashedPassword,
    })
    return { email: user.email, id: user.id }
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  const user = await User.findById(id)
  return user
}

export const checkUserPassword = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const user = await User.findOne({ email })
  if (user) {
    if (await bcrypt.compare(password, user.password!)) return user.id
  }
  return null
}

export const deleteUser = async (userId: string) => {
  try {
    await deleteUserNotes(userId)
    await User.findByIdAndDelete(userId).exec()
    return true
  } catch {
    return false
  }
}
