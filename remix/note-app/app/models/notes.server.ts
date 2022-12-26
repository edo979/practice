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
  const note: INote = await Note.create({ userId, title, body })
  return { id: note.id }
}

export const getNotesIdAndTitle = async (userId: string) => {
  const notes = await Note.find({ userId }).select('id title')
  const notesWithId: { id: string; title: string }[] = notes.map((note) => ({
    id: note._id,
    title: note.title,
  }))

  return notesWithId
}
