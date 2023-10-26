import Note from '../../src/models/note'
import mongoose from 'mongoose'
import User from '../../src/models/user'
import jwt from 'jsonwebtoken'

export const setupDatabase = async () => {
  await Note.deleteMany()
  await User.deleteMany()
}

export const userOneId = new mongoose.Types.ObjectId()
export const userOne = {
  _id: userOneId,
  name: 'Edi Seli',
  email: 'jah@jah.jah',
  password: 'jahjah',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET!),
    },
  ],
}

export const userTwoId = new mongoose.Types.ObjectId()
export const userTwo = {
  _id: userOneId,
  name: 'Seli Seli',
  email: 'seli@jah.jah',
  password: 'jahjah',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET!),
    },
  ],
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
