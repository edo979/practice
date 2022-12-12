import { Request, Response } from 'express'
import Note from '../model/Note'
import Tag from '../model/Tag'
import User from '../model/User'

export const notesController = {
  all: async (req: Request, res: Response) => {
    try {
      const notes = await Note.find().populate('tags')
      res.json(notes)
    } catch (error) {
      res.status(500).send({ message: 'Could not get Notes.' })
    }
  },

  userNotes: async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId
      const notes = await User.findById(userId)
        .populate({
          path: 'notes',
          select: 'title body tags',
          populate: {
            path: 'tags',
            select: '-_id label',
          },
        })
        .select('-_id userName notes')

      res.json(notes)
    } catch (error) {
      res.status(500).send({ message: 'Could not get Notes.' })
    }
  },

  note: async (req: Request, res: Response) => {
    const { noteId } = req.params
    try {
      const note = await Note.findById(noteId)
        .populate({
          path: 'tags',
          select: '-_id label',
        })
        .select('title body tags')

      if (!note) return res.status(404).send({ message: "Note doesn't exist!" })
      res.json(note)
    } catch (error) {
      res.status(500).send({ message: 'Could not get Note.' })
    }
  },

  save: async (req: Request, res: Response) => {
    try {
      const title: string = req.body.title
      const body: string = req.body.body
      const tags: string[] = req.body.tags
      const userId = req.session.userId
      if (!userId) return res.status(403).send({ message: 'Must be login!' })

      if (title === '' || body === '' || tags.length === 0)
        res.status(403).send({ message: 'Form submit wrong.' })

      // Check for new tags
      let tagsFromDB = await Tag.find()
      const newTags = tags.filter((tag) =>
        tagsFromDB.every((tagFromDB) => tagFromDB.label !== tag)
      )

      // Create new Tags
      if (newTags.length > 0) {
        await Tag.insertMany(newTags.map((tag) => ({ label: tag })))
        tagsFromDB = await Tag.find()
      }

      //Create new Note
      const noteTagsIds = tags.map((tag) => {
        const noteTag = tagsFromDB.find((tagFromDB) => tagFromDB.label === tag)
        if (!noteTag) throw new Error('Tag not found')
        return noteTag._id
      })
      const note = await Note.create({ title, body, tags: noteTagsIds })

      // Add note to user
      const user = await User.findById(userId)
      if (!user) return res.status(403).send({ message: 'User not exist!' })
      user.notes.push(note._id)
      await user.save()

      return res.status(200).end()
    } catch (error) {
      res.status(500).send({ message: 'Could not save Note' })
    }
  },
}
