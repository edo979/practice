import mongoose from 'mongoose'
import { tagSchema } from './Tag'

export const noteSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    tags: [tagSchema],
  },
  { timestamps: true }
)

const Note = mongoose.model('Note', noteSchema)

export default Note
