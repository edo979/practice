import express, { Request, Response } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/db'
import Note from './model/Note'
import Tag from './model/Tag'
import mongoose, { Mongoose } from 'mongoose'

config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
connectDB()

app.use(cors())

// Index
app.get('/', async (req: Request, res: Response) => {
  try {
    const notes = await Note.find().select('_id title body').populate('tags')
    res.json(notes)
  } catch {
    res.status(500).send({ message: 'Server error' })
  }
})

// Show notes
app.get('/notes', (req: Request, res: Response) => {
  res.send('View notes')
})

// Show and update note
app
  .route('/notes/:noteId')
  .get(async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    try {
      const note = await Note.findById(noteId)
        .select('_id title body')
        .populate('tags')
      if (!note) return res.status(404).send({ message: 'Note not found' })
      res.json(note)
    } catch {
      res.status(500).send({ message: 'Server error' })
    }
  })
  .post(async (req: Request, res: Response, next) => {
    const noteId = req.params.noteId
    const { title, body, tags } = req.body
    if (title === '' || body === '' || tags.length === 0)
      return res.status(400).send({ message: 'Bad request' })

    try {
      await Note.updateOne({ _id: noteId }, { title, body, tags })
      res.status(302).end()
    } catch (error) {
      next(error)
    }
  })

// Add and note
app.post('/notes/new', (req: Request, res: Response) => {
  const title: string = req.body.title,
    body: string = req.body.body,
    tags: string[] = req.body.tags

  if (title === '' || body === '' || tags.length === 0) {
    return res.status(403).send({ message: 'Form submitet wrong!' })
  }

  const newNote = new Note({
    title,
    body,
    tags,
  })
  newNote.save()
  res.json(newNote)
})

// Delete note
app.delete('/notes', async (req: Request, res: Response) => {
  const noteId = req.body.noteId

  try {
    await Note.findByIdAndDelete(noteId)
    res.status(302).end()
  } catch {
    res.status(500).send({ message: 'Server Error!' })
  }
})

// Get Tags
app.get('/tags', async (req: Request, res: Response) => {
  const tags = await Tag.find().select('_id label')
  res.json(tags)
})

// Save Tag
app.post('/tags', async (req: Request, res: Response) => {
  const tagsLabels: string[] = req.body.tags
  const tagsToSave = tagsLabels.map((label) => ({ label }))

  const tags = await Tag.create(tagsToSave)
  const tagsIds = tags.map((tag) => tag._id)

  res.json(tagsIds)
})

// Update Tag
app.patch('/tags', async (req: Request, res: Response) => {
  const label: string = req.body.label
  const id: string = req.body.id

  if (id === '' || label === '') {
    res.status(400).send({ message: 'Bad request' })
  }

  try {
    await Tag.updateOne({ _id: id }, { label: label })
    res.status(302).end()
  } catch {
    res.status(500).send({ message: 'Server Error!' })
  }
})

// Delete tag
app.delete('/tags', async (req: Request, res: Response) => {
  const id: string = req.body.id

  try {
    await Note.find({ tags: { _id: id } }).then((notes) => {
      notes.forEach((note) => {
        note.tags = note.tags.filter((tag) => tag._id.toString() !== id)
        note.save()
      })
    })
    await Tag.findByIdAndDelete(id)
    res.status(302).end()
  } catch {
    res.status(500).send({ message: 'Server Error!' })
  }
})

app.listen(PORT, () => console.log(`Server listenint on port: ${PORT}`))
