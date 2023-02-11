'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <main className="mx-auto my-8 p-8 rounded prose shadow text-center shadow-rose-700 bg-rose-500 ">
      <h1 className="text-rose-200">❌ Server Error</h1>
      <p className="lead text-rose-100 border-t border-rose-600">
        Sorry an error has occurred
      </p>
    </main>
  )
}
