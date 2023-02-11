import clientPromise from './mongodb'

type UserT = {
  username: string
  password: string
}

async function getDB(db = 'simple-blog') {
  // throw new Error()
  const client = await clientPromise
  return client.db(db)
}

export async function getUser(username: string) {
  try {
    const db = await getDB()
    const user = await db.collection<UserT>('users').findOne({ username })

    return user
  } catch {
    return null
  }
}
