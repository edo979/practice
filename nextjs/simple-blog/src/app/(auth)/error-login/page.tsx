import Link from 'next/link'
export default function ErrorLogin({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const errorMsg = searchParams?.error || 'Error on server'

  return (
    <main className="mx-auto my-8 p-8 rounded prose shadow text-center shadow-rose-700 bg-rose-500 ">
      <h1 className="text-rose-200">❌ {errorMsg}</h1>
      <div className="flex gap-4 items-center border-t border-rose-600">
        <Link href="/login" className="btn btn-dark no-underline">
          Back
        </Link>
        <p className="lead text-rose-100">Sorry an error has occurred</p>
      </div>
    </main>
  )
}
