import mongoose from 'mongoose'
import { config } from 'dotenv'
import Note from '../model/Note'
import Tag from '../model/Tag'
import User from '../model/User'

config()

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log('mongo connection is open.'))
  .catch((err) => console.log(err))

const clearDB = async () => {
  await Tag.deleteMany({})
  await Note.deleteMany({})
  await User.deleteMany({})
}

const seedDB = async () => {
  await clearDB()

  const tags = await Tag.insertMany([
    {
      label: 'javascript',
    },
    {
      label: 'typescript',
    },
    {
      label: 'react',
    },
  ])

  const notes = await Note.insertMany([
    {
      title: 'First Note',
      body: '# First Note Body',
      tags: [tags[0]._id, tags[1]._id],
    },
    {
      title: 'Second Note',
      body: '# Second Note Body',
      tags: [tags[2]._id, tags[1]._id],
    },
  ])

  await User.insertMany([
    { userName: 'first', password: 'first', notes: [notes[0]._id] },
    { userName: 'second', password: 'second', notes: [notes[1]._id] },
  ])
}

seedDB().then(() =>
  mongoose.connection.close(() =>
    console.log('DB is seeded. Connection is closed!')
  )
)
