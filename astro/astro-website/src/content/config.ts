import { z, defineCollection } from 'astro:content'

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string().transform((str) => new Date(str)),
    author: z.string(),
  }),
})

export const collections = {
  post: postCollection,
}
