import express, { Request, Response } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/db'
import Note from './model/Note'
import Tag from './model/Tag'

config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
connectDB()

app.use(cors())

// Index
app.get('/', async (req: Request, res: Response) => {
  try {
    const notes = await Note.find().select('_id title body')
    res.json(notes)
  } catch {
    res.status(500).send({ message: 'Server error' })
  }
})

// Show notes
app.get('/notes', (req: Request, res: Response) => {
  res.send('View notes')
})

// Show note
app.get('/notes/:noteId', async (req: Request, res: Response) => {
  const noteId = req.params.noteId
  try {
    const note = await Note.findById(noteId).select('_id title body')
    if (!note) return res.status(404).send({ message: 'Note not found' })
    res.json(note)
  } catch {
    res.status(500).send({ message: 'Server error' })
  }
})

// Add note
app.post('/notes/new', (req: Request, res: Response) => {
  const title = req.body.title,
    body = req.body.body

  if (
    typeof title !== 'string' ||
    typeof body !== 'string' ||
    title === '' ||
    body === ''
  ) {
    return res.status(403).send({ message: 'Form submitet wrong!' })
  }

  const newNote = new Note({
    title,
    body,
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

  res.json(tags)
})

app.listen(PORT, () => console.log(`Server listenint on port: ${PORT}`))
