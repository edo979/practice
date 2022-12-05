import mongoose from 'mongoose'
import { noteSchema } from './Note'

const userSchema = new mongoose.Schema(
  {
    userName: String,
    password: String,
    notes: [noteSchema],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
