import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import connectDB from './config/db'
import Note from './model/Note'

config()
const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.get('/', async (req: Request, res: Response) => {
  const notesCount = await Note.count()
  res.json({ notes: notesCount })
})

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
