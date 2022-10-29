import type { Post } from '@prisma/client'
import { prisma } from '~/db.server'

export type { Post }

export async function getPosts() {
  return await prisma.post.findMany()
}
