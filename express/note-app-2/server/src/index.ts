import express, { Request, Response } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/db'
import Note from './model/Note'
import User from './model/User'
import Tag from './model/Tag'
import { router as userRouter } from './sessionRouter'
import { tagsController } from './controllers/tagsController'

config()
const app = express()
const PORT = process.env.PORT || 5000
connectDB()

const corsOptions = {
  origin: 'http://localhost:5173', //Your Client, do not write '*'
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/user', userRouter)

app.get('/', async (req: Request, res: Response) => {
  const notesCount = await Note.count()
  const tagsCount = await Tag.count()
  const usersCount = await User.count()
  res.json({ notesCount, tagsCount, usersCount })
})

app.get('/tags', tagsController.all)

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
