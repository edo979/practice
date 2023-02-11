import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    userName: String,
    password: String,
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
      },
    ],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
