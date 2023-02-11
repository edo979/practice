import { getPost } from '../../../../lib/crud'
import Form from '../../../components/Form'
import { PostT } from '../page'

export default async function SinglePostEditRoute({
  params: { id },
}: {
  params: { id: string }
}) {
  const { title, desc, text } = (await getPost(id)) as unknown as PostT

  return (
    <>
      <h1 className="mt-4">Edit post.</h1>
      <Form
        data={{ title, desc, text }}
        method={'PATCH'}
        url={`/api/posts/${id}`}
      />
    </>
  )
}
