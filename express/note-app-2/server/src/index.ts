import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import connectDB from './config/db'
import Note from './model/Note'
import User from './model/User'
import Tag from './model/Tag'

config()
const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.get('/', async (req: Request, res: Response) => {
  const notesCount = await Note.count()
  res.json({ notes: notesCount })
})

app.post('/notes', async (req: Request, res: Response) => {
  const note = await Note.create({
    title: 'jah',
    body: 'jah jag',
    tags: ['63888a6bd906726aa84205dc'],
  })
  await note.save()
  res.status(302).send()
})

app.get('/notes', async (req: Request, res: Response) => {
  const tags = await Tag.find()

  const notes = await Note.find().populate('tags')

  res.json(notes)
})

app.post('/user', async (req: Request, res: Response) => {
  try {
    const user = await User.create({
      userName: 'jah',
      password: 'jah',
      notesId: ['638e3a6d7890dd8bcddc0b7e'],
    })
    await user.save()
  } catch {
    res.status(500).send('Server on DB!')
  }

  res.status(302).send()
})

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
