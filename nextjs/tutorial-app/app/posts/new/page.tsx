import AddPostForm from '../../components/Form'

export default async function AddPostRoute() {
  return (
    <main className="prose mx-auto">
      <h1 className="mt-4">Add new post.</h1>
      <AddPostForm />
    </main>
  )
}
