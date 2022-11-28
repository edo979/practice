import express, { Request, Response } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/db'
import Note from './model/Note'

config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
connectDB()

app.use(cors())

// Index
app.get('/', async (req: Request, res: Response) => {
  const notes = await Note.find().select('_id title body')
  return res.json(notes)
})

// Show notes
app.get('/notes', (req: Request, res: Response) => {
  res.send('View notes')
})

// Show note
app.get('/notes/:noteId', async (req: Request, res: Response) => {
  const noteId = req.params.noteId
  const note = await Note.findById(noteId).select('_id title body')
  if (!note) return res.status(404).send({ message: 'Note not found' })
  res.json(note)
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

app.listen(PORT, () => console.log(`Server listenint on port: ${PORT}`))
