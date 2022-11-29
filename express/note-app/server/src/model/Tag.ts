import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  label: String,
})

const Tag = mongoose.model('Tag', tagSchema)

export default Tag
