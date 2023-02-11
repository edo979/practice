import type { Post } from '@prisma/client'
import { prisma } from '~/db.server'

export type { Post }

export async function getPosts() {
  return await prisma.post.findMany()
}

export async function getFirstPost() {
  return await prisma.post.findFirst()
}

export async function getPost(slug: string) {
  return await prisma.post.findFirst({ where: { slug: slug } })
}

export async function createPost(
  post: Pick<Post, 'slug' | 'title' | 'markdown'>
) {
  return await prisma.post.create({ data: post })
}

export async function updatePost(
  slug: string,
  post: Pick<Post, 'slug' | 'title' | 'markdown'>
) {
  return await prisma.post.update({
    where: { slug: slug },
    data: { title: post.title, slug: post.slug, markdown: post.markdown },
  })
}

export async function deletePost(slug: string) {
  return await prisma.post.delete({ where: { slug: slug } })
}
