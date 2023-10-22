import { Router } from 'express'
import Note from '../models/note'

const noteRouter = Router()

noteRouter.get('/notes', async (req, res) => {
  const notes = await Note.find()

  console.log(notes)
  res.send(notes)
})

export default noteRouter
