import { mongoose } from '~/models/db.server'

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
})

const User = mongoose.model('User', userSchema)

export async function getUser(id: string) {
  const user = await User.findById(id)
  return user
}

export async function createUser(email: string, password: string) {
  const user = await User.create({ email, password })
  return user
}
