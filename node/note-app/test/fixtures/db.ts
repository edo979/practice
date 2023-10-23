import Note from '../../src/models/note'
import mongoose from 'mongoose'

export const setupDatabase = async () => {
  await Note.deleteMany()
}

export const firstTaskId = new mongoose.Types.ObjectId()
export const secondTaskId = new mongoose.Types.ObjectId()
export const firstTask = {
  _id: firstTaskId,
  title: 'First note',
  body: 'First note body.',
}
export const secondTask = {
  _id: secondTaskId,
  title: 'Second note',
  body: 'Second note body.',
}

export const createTestNotes = async () => {
  await Note.insertMany([firstTask, secondTask])
}
