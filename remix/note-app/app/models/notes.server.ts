import { mongoose } from './db.server'
import bcrypt from 'bcryptjs'

interface INote {
  id: string
  userId: string
  title: string
  body: string
}

const noteScheme = new mongoose.Schema({
  userId: String,
  title: String,
  body: String,
})

const Note = mongoose.models.Note || mongoose.model('Note', noteScheme)

export const createNote = async ({
  userId,
  title,
  body,
}: {
  userId: string
  title: string
  body: string
}) => {
  const note: INote = await new Note({ userId, title, body })
  return { id: note.id }
}

export const getNotes = async (userId: string) => {
  const notes: INote[] = await Note.find({ userId })
  return notes
}
