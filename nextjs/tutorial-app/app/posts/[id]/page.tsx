import Link from 'next/link'
import { getPost } from '../../../lib/crud'
import DeleteModal from '../../components/DeletePostModal'

export type PostT = {
  title: string
  desc: string
  text: string
}

export default async function SinglePostRoute({
  params: { id },
}: {
  params: { id: string }
}) {
  const post = await getPost(id)
  if (!post) throw new Error('No post')
  const { title, desc, text } = post as unknown as PostT

  return (
    <article className="my-8">
      <header>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm: justify-between">
          <h1>{title} </h1>
          <div className="flex gap-2">
            <label
              className="btn btn-circle btn-error ml-auto"
              htmlFor="my-modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Delete</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
            <Link
              href={`/posts/${id}/edit`}
              className="btn btn-circle btn-info"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <title>Edit</title>
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
              </svg>
            </Link>
          </div>
        </div>
        <p className="text-lg">{desc}</p>
      </header>
      <main>
        <p>{text}</p>
        <Link href={'/'} className="mt-8 inline-block">
          Back to home...
        </Link>
      </main>

      <DeleteModal postId={id} />
    </article>
  )
}
