import mongoose, { Schema, model } from 'mongoose'

const noteSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, 'Title must be 3 or more characters long.'],
  },
  body: { type: String, trim: true, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
})

const Note = model('Note', noteSchema)

export default Note
