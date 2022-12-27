import mongoose from 'mongoose'

if (mongoose.models['Note']) {
  delete mongoose.models['Note']
}

const noteScheme = new mongoose.Schema({
  userId: String,
  title: String,
  body: String,
})

const Note = mongoose.model('Note', noteScheme)

export const createNote = async ({
  userId,
  title,
  body,
}: {
  userId: string
  title: string
  body: string
}) => {
  const note = await Note.create({ userId, title, body })
  return { id: note.id }
}

export const getNotesIdAndTitle = async (userId: string) => {
  const notes = await Note.find({ userId }).select('id title')
  const notesWithId = notes.map((note) => ({
    id: note.id,
    title: note.title,
  }))

  return notesWithId
}

export const getNote = async (noteId: string) => {
  const note = await Note.findById(noteId)
  return note
}

export const deleteUserNotes = async (userId: string) => {
  await Note.deleteMany({ userId })
}
