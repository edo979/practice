import mongoose from 'mongoose'

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL!)
  console.log('Mongo DB connected')
}

export default connectDB
