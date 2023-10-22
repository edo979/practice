import { Schema, model } from 'mongoose'

interface INote {
  title: string
  body: string
}

const noteSchema = new Schema<INote>({
  title: { type: String, required: true },
  body: { type: String, required: true },
})

const Note = model<INote>('Note', noteSchema)

export default Note
