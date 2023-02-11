import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'

export type PostT = {
  _id?: ObjectId
  title: string
  desc: string
  body: string
  user_name: string
  createdAt?: Date
  updatedAt?: Date
}

async function getDB(db = 'simple-blog') {
  // throw new Error()
  const client = await clientPromise
  return client.db(db)
}

export async function getPosts() {
  const db = await getDB()
  const posts = await db
    .collection<PostT>('posts')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()
  return posts
}

export async function getPost(id: string) {
  const db = await getDB()
  return await db.collection<PostT>('posts').findOne({ _id: new ObjectId(id) })
}

export async function getUserPosts(username: string) {
  const db = await getDB()
  return await db
    .collection<PostT>('posts')
    .find({ user_name: username })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function createPost(data: PostT) {
  const db = await getDB()
  const post = db
    .collection<PostT>('posts')
    .insertOne({ ...data, createdAt: new Date(), updatedAt: new Date() })
  return true
}

export async function editPost({
  id,
  title,
  desc,
  body,
}: {
  id: string
  title: string
  desc: string
  body: string
}) {
  const db = await getDB()
  db.collection<PostT>('posts').updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, desc, body } }
  )
}

export async function deletePost(id: string) {
  const db = await getDB()
  db.collection('posts').deleteOne({ _id: new ObjectId(id) })
}
