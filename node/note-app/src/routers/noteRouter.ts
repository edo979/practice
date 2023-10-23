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

noteRouter.patch('/notes/:id', async (req, res) => {
  type UpdatesT = 'title' | 'body'

  const updates = Object.keys(req.body) as UpdatesT[]
  const allowedUpdates = ['title', 'body']
  const isValidUpdate = updates.every(
    (update) => allowedUpdates.includes(update) && req.body[update] !== ''
  )

  if (!isValidUpdate)
    return res.status(400).send({ error: 'Invalid updates data' })

  try {
    const note = await Note.findById(req.params.id)

    if (!note) return res.status(404).send({ error: 'Note is not found!' })

    updates.forEach((update) => (note[update] = req.body[update]))

    await note.save()
    res.send(note)
  } catch (error) {
    res.status(500).send()
  }
})

export default noteRouter
