import { Request, Response } from 'express'
import Note from '../model/Note'
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
}
