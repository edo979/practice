import mongoose from 'mongoose'

const url = process.env.MONGODB_URL

if (!url) throw new Error("Cant't connect to mongoose in mongoose file")

mongoose.connect(url)

export const closeConnection = () => mongoose.connection.close()
