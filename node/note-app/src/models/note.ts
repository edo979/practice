import { Schema, model } from 'mongoose'

interface INote {
  title: string
  body: string
}

const noteSchema = new Schema<INote>({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, 'Title must be 3 or more characters long.'],
  },
  body: { type: String, trim: true, required: true },
})

const Note = model<INote>('Note', noteSchema)

export default Note
