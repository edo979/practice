import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import connectDB from './config/db'
import Note from './model/Note'

config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
connectDB()

// Index
app.get('/', (req: Request, res: Response) => {
  res.send('Index note')
})

// Show notes
app.get('/notes', (req: Request, res: Response) => {
  res.send('View notes')
})

// Add note
app.post('/notes', (req: Request, res: Response) => {
  const newNote = new Note({
    title: req.body.title,
    body: req.body.body,
  })

  newNote.save()

  res.json(newNote)
})

app.listen(PORT, () => console.log(`Server listenint on port: ${PORT}`))
