import { Router } from 'express'
import Note from '../models/note'

const noteRouter = Router()

noteRouter.post('/notes', async (req, res) => {
  const { title, body } = req.body

  try {
    const note = new Note({ title, body })
    await note.save()

    res.status(201).send(note)
  } catch (error) {
    res.status(404).send('Error while saving note to database.')
  }
})

noteRouter.get('/notes', async (req, res) => {
  const notes = await Note.find()

  res.status(200).send({ notes })
})

export default noteRouter
