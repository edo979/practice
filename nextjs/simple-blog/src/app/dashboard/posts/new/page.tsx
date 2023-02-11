import NewPost from '@/Components/postForm/NewPost'

export default function NewPostRoute() {
  return (
    <div className="mx-auto my-8 px-4 prose md:px-2">
      <h1>Add new post</h1>

      <NewPost />
    </div>
  )
}
