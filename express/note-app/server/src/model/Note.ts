import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  { timestamps: true }
)

const Note = mongoose.model('Note', noteSchema)

export default Note
