export default function SingleBlogRoute({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <div>
      SingleBlogRoute <b>{params.slug}</b>
    </div>
  )
}
