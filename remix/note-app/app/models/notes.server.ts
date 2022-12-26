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
