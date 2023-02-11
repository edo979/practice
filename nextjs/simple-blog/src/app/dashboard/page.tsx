import DashboardListItem from '@/Components/DashboardListItem'
import { getUserPosts } from '@/lib/postsModel'
import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function () {
  const session = await unstable_getServerSession()
  if (!session?.user?.name) throw new Error('Session error')
  const posts = await getUserPosts(session?.user?.name)

  return (
    <div className="flex flex-col sm:flex-row">
      <ul className="py-4 px-4 flex flex-row justify-center gap-8 rounded bg-gray-900 text-gray-300 sm:min-h-[400px] sm:flex-col sm:gap-0 sm:justify-start sm:basis-1/6 sm:divide-y sm:divide-gray-600">
        <li className="sm:py-2">📝 Posts</li>
        <li className="sm:py-2">❤ Profile</li>
      </ul>

      <div className="mx-auto py-8 px-4 w-full sm:max-w-2xl sm:basis-5/6 md:my-4 md:py-4">
        <h1 className="text-xl mb-4 font-semibold md:text-4xl md:font-bold md:mb-8">
          Welcome to dashboard.
        </h1>

        <div className="flex justify-end">
          <Link href={'dashboard/posts/new'} className="btn btn-primary">
            💾 New
          </Link>
        </div>

        <ul className="m-0 p-0 mt-4 divide-y divide-gray-300">
          {posts.map((post) => (
            <li
              key={post._id.toString()}
              className="py-1 pl-1 even:bg-gray-200 hover:bg-indigo-300"
            >
              <DashboardListItem title={post.title} id={post._id.toString()} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
