import { Request, Response } from 'express'
import Tag from '../model/Tag'

export const tagsController = {
  all: async (req: Request, res: Response) => {
    try {
      const tags = await Tag.find().select('-_id label')
      res.json({ tags })
    } catch {
      res.status(500).send('Server error!')
    }
  },
}
