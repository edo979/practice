import { Router } from 'express'
import Note from '../models/note'
import auth, { AuthRequest } from '../middleware/auth'

const noteRouter = Router()

noteRouter.post('/notes', auth, async (req: AuthRequest, res) => {
  const { title, body } = req.body

  try {
    const note = new Note({ title, body, owner: req.user?._id })
    await note.save()

    res.status(201).send(note)
  } catch (error) {
    res.status(404).send('Error while saving note to database.')
  }
})

noteRouter.get('/notes', auth, async (req: AuthRequest, res) => {
  try {
    await req.user?.populate('notes')

    res.send(req.user?.notes)
  } catch (error) {
    res.status(500).send()
  }
})

noteRouter.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id })

    return res.status(200).send({ note })
  } catch (error) {
    return res.status(404).send()
  }
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

    try {
      await note.validate()
      note.save()
      res.send(note)
    } catch (error) {
      res.status(400).send({ error: 'Invalid update data!' })
    }
  } catch (error) {
    res.status(500).send()
  }
})

noteRouter.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id)
    if (!note) return res.status(404).send()

    res.status(200).send(note)
  } catch (error) {
    res.status(500).send()
  }
})

export default noteRouter
