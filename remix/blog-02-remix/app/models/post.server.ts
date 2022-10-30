import type { Post } from '@prisma/client'
import { prisma } from '~/db.server'

export type { Post }

export async function getPosts() {
  return await prisma.post.findMany()
}

export async function getFirstPost() {
  return await prisma.post.findFirst()
}

export async function createPost(
  post: Pick<Post, 'slug' | 'title' | 'markdown'>
) {
  return await prisma.post.create({ data: post })
}
