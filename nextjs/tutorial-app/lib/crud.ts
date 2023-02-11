import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'

type PostT = {
  title: string
  desc: string
  text: string
}

export async function getPosts() {
  try {
    const db = await connectDB()
    const posts = await db
      .collection('blogs')
      .find({})
      .sort({ createdAt: -1 })
      .project({ createdAt: 0, updatedAt: 0, __v: 0 })
      .toArray()
    return posts
  } catch (e) {
    console.log(e)
  }
}

export async function getPost(id: string) {
  try {
    const db = await connectDB()
    const post = await db
      .collection('blogs')
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { title: 1, desc: 1, text: 1 } }
      )
    return post
  } catch (error) {
    console.log(error)
  }
}

export async function createPost({
  title,
  desc,
  text,
}: {
  title: string
  desc: string
  text: string
}) {
  const db = await connectDB()
  await db.collection('blogs').insertOne({
    title,
    desc,
    text,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  })
}

export async function updatePost(id: string, data: PostT) {
  const db = await connectDB()
  await db
    .collection('blogs')
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...data } })
}

export async function deletePost(id: string) {
  const db = await connectDB()
  await db.collection('blogs').deleteOne({ _id: new ObjectId(id) })
}

async function connectDB() {
  const client = await clientPromise
  return client.db('simple-blog')
}
