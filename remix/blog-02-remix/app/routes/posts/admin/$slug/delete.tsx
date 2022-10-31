import { ActionFunction, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { deletePost } from '~/models/post.server'

export const action: ActionFunction = async ({ params }) => {
  invariant(params.slug, 'slug required for deleting post')
  await deletePost(params.slug)
  return redirect('/posts/admin')
}
