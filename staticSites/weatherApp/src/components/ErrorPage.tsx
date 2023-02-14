export default function ErrorPage() {
  return (
    <div className="grid min-h-screen w-full place-content-center bg-rose-400">
      <div className="mx-3 rounded border border-rose-50 bg-rose-200 p-8 text-center text-rose-900 shadow-lg">
        <h1 className="text-3xl font-bold">❌ Došlo je do greške!</h1>
        <p className="mt-4 text-xl">
          🤷‍♂️ Žao mi je ali desila se greška. Pokušajte ponovo.
        </p>
      </div>
    </div>
  )
}
