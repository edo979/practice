import { Request, Response } from 'express'
import Note from '../model/Note'

export const notesController = {
  all: async (req: Request, res: Response) => {
    try {
      const notes = await Note.find().populate('tags')
      res.json(notes)
    } catch (error) {
      res.status(500).send({ message: 'Could not get Notes.' })
    }
  },
}
