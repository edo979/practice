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

export const checkNoteUser = async ({
  noteId,
  userId,
}: {
  noteId: string
  userId: string
}) => {
  console.log(noteId)
  try {
    const note = await Note.findById(noteId).where(userId)
    return true
  } catch {
    return false
  }
}

export const getNote = async (noteId: string) => {
  const note = await Note.findById(noteId)
  return note
}

export const editNote = async ({
  noteId,
  title,
  body,
}: {
  noteId: string
  title: string
  body: string
}) => {
  const note = await Note.findByIdAndUpdate(noteId, { title, body }).exec()
  return note
}

export const deleteNote = async (noteId: string) => {
  await Note.findByIdAndDelete(noteId)
}

export const deleteUserNotes = async (userId: string) => {
  await Note.deleteMany({ userId })
}
