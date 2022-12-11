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
          select: '-_id title body tags',
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
  save: async (req: Request, res: Response) => {
    try {
      const title: string = req.body.title
      const body: string = req.body.body
      const tags: string[] = req.body.tags

      if (title === '' || body === '' || tags.length === 0)
        res.status(403).send({ message: 'Form submit wrong.' })

      // Check for new tags
      const tagsFromDB = await Tag.find()
      const newTags = tags.filter((tag) =>
        tagsFromDB.every((tagFromDB) => tagFromDB.label !== tag)
      )
      console.log(newTags)
      return res.status(200).end()

      //const note = await Note.create({ title, body, tags })
    } catch (error) {
      res.status(500).send({ message: 'Could not save Note' })
    }
  },
}
