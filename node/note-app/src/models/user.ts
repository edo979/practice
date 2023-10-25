import { Schema, model } from 'mongoose'
import jwt from 'jsonwebtoken'

interface IUser {
  username: string
  age: number
  email: string
  password: string
  tokens: { token: string }[]
  generateAuthToken: () => Promise<string>
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'Username is to short!'],
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [3, 'Password is to short!'],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'jahjah')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

const User = model<IUser>('User', userSchema)

export default User
