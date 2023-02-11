import mongoose from 'mongoose'

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI!)

  console.log(`Mongo DB connected`)
}

export default connectDB
