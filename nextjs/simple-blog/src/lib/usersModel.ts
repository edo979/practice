import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'
import bcrypt from 'bcrypt'

export type UserT = {
  _id?: ObjectId
  username: string
  password: string
  posts: [ObjectId]
}

async function getDB(db = 'simple-blog') {
  // throw new Error()
  const client = await clientPromise
  return client.db(db)
}

export async function getUser(id: string) {
  const db = await getDB()
  return await db.collection<UserT>('users').findOne({ _id: new ObjectId(id) })
}

export async function getUserByUsername(username: string) {
  const db = await getDB()
  return await db.collection<UserT>('users').findOne({ username })
}

export async function createUser(data: { username: string; password: string }) {
  const db = await getDB()

  const user = await db
    .collection<UserT>('users')
    .findOne({ username: data.username })
  if (user) return false

  const hashedPassword = await bcrypt.hash(data.password, 8)

  await db
    .collection('users')
    .insertOne({ username: data.username, password: hashedPassword, posts: [] })
  return true
}
