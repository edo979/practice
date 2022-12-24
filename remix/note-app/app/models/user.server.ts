import { mongoose } from './db.server'

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
  const user = await User.create({ email, password })
  return user
}
