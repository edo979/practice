import { Schema, model } from 'mongoose'

interface IUser {
  username: string
  age: number
  email: string
  password: string
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
})

const User = model<IUser>('User', userSchema)

export default User
