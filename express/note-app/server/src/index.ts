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

// Add note
app.post('/notes/new', (req: Request, res: Response) => {
  const newNote = new Note({
    title: req.body.title,
    body: req.body.body,
  })

  if (
    typeof newNote.title !== 'string' ||
    typeof newNote.body !== 'string' ||
    newNote.title === '' ||
    newNote.body === ''
  ) {
    return res.status(403).send({ message: 'Form submitet wrong!' })
  }

  newNote.save()
  res.json(newNote)
})

app.listen(PORT, () => console.log(`Server listenint on port: ${PORT}`))
