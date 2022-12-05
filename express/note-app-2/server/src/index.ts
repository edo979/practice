import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import connectDB from './config/db'
import Note from './model/Note'
import User from './model/User'
import Tag from './model/Tag'
import { notesController } from './controllers/notesController'

config()
const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.get('/', async (req: Request, res: Response) => {
  const notesCount = await Note.count()
  const tagsCount = await Tag.count()
  const usersCount = await User.count()
  res.json({ notesCount, tagsCount, usersCount })
})

app.get('/notes', notesController.all)

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
