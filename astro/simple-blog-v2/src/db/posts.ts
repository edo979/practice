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

export async function createPost(data: {
  title: string
  desc: string
  body: string
  user_name: string
}) {
  try {
    const db = await getDB()
    const post = await db
      .collection<PostT>('posts')
      .insertOne({ ...data, createdAt: new Date(), updatedAt: new Date() })
    return post.acknowledged
  } catch {
    return false
  }
}

export async function getPosts() {
  try {
    const db = await getDB()
    const posts = await db
      .collection<PostT>('posts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    return posts
  } catch {
    return null
  }
}

export async function getPost(id: string) {
  const db = await getDB()
  return await db.collection<PostT>('posts').findOne({ _id: new ObjectId(id) })
}

export async function deletePost(id: string) {
  const db = await getDB()
  return (await db.collection('posts').deleteOne({ _id: new ObjectId(id) }))
    .acknowledged
}

export async function updatePost(
  postId: string,
  data: {
    title: string
    desc: string
    body: string
  }
) {
  try {
    const db = await getDB()
    const result = await db
      .collection<PostT>('posts')
      .updateOne(
        { _id: new ObjectId(postId) },
        { $set: { ...data, updatedAt: new Date() } }
      )

    if (result.acknowledged) return true
    return false
  } catch (e) {
    //console.log(e)
    return false
  }
}
