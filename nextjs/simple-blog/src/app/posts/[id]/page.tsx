import { getPost } from '@/lib/postsModel'

export default async function SinglePostRoute({
  params,
}: {
  params: { id: string }
}) {
  const post = await getPost(params.id)
  if (!post) return null

  return (
    <article className="mt-8 mx-auto prose">
      <header>
        <h1>{post.title}</h1>

        <p className="text-lg font-semibold tracking-tight">{post.desc}</p>
      </header>

      <main>
        <p>{post.body}</p>
      </main>
    </article>
  )
}
