import EditPost from '@/Components/postForm/EditPost'
import { getPost } from '@/lib/postsModel'
import { unstable_getServerSession } from 'next-auth'

export default async function DashboardPostEditRoute({
  params,
}: {
  params: { id: string }
}) {
  const postId = params.id
  const session = await unstable_getServerSession()
  const post = await getPost(postId)
  if (!post) throw new Error('That post not exist!')
  if (session?.user?.name !== post.user_name)
    throw new Error('Post you trying to edit is not yours!')

  return (
    <div className="mx-auto my-8 px-4 prose md:px-2">
      <h1>Add new post</h1>

      <EditPost postId={postId} postData={post} />
    </div>
  )
}
