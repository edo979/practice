import { Request, Response } from 'express'
import { nextTick } from 'process'
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
      const userId = req.session.userId
      const user = await User.find({
        $and: [{ _id: userId }, { notes: { $in: noteId } }],
      }).catch((res) => null)

      //check if note belongs to this user
      if (!user)
        return res.status(401).send({ message: 'Note is not in user notes.' })

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

  update: async (req: Request, res: Response) => {
    const { noteId } = req.params
    try {
      const userId = req.session.userId
      const user = await User.find({
        $and: [{ _id: userId }, { notes: { $in: noteId } }],
      }).catch((res) => null)

      //check if note belongs to this user
      if (!user)
        return res.status(401).send({ message: 'Note is not in user notes.' })

      const { title, tags, body } = req.body
      const tagsID = await Tag.find({ label: { $in: tags } })
        .select('_id')
        .then((results) => results.map((tag) => tag._id))

      const note = await Note.findByIdAndUpdate(noteId, {
        title,
        body,
        tags: tagsID,
      })

      res.send({ message: 'Note is updated' })
    } catch (error) {
      res.status(500).send({ message: 'Could not edit Note.' })
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

  delete: async (req: Request, res: Response) => {
    const { noteId } = req.body
    const userId = req.session.userId

    try {
      const user = await User.findOne({
        $and: [{ _id: userId }, { notes: { $in: noteId } }],
      })
        .select('notes')
        .catch((result) => null)

      if (!user) {
        return res.status(401).send({ message: 'Note is not in user notes.' })
      }

      await Note.findByIdAndDelete(noteId)

      const index = user.notes.indexOf(noteId)
      if (index > -1) {
        user.notes.splice(index, 1)
      }
      await user.save()

      res.send({ message: 'Note deleted' })
    } catch {
      res.status(500).send({ message: 'Could not delete Note.' })
    }
  },
}
