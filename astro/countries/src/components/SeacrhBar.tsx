import { useState } from 'react'

type SearchBarProps = {
  findByName: (name: string) => void
}

export default function SeacrhBar({ findByName }: SearchBarProps) {
  const [name, setName] = useState('')

  return (
    <div className="mt-8 flex flex-row items-center gap-4">
      <form
        className="input-group max-w-md flex-1"
        onSubmit={(e) => {
          e.preventDefault()
          findByName(name)
        }}
      >
        <label htmlFor="name" className="block text-md tracking-tight">
          IME DRŽAVE
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="upiši ime države..."
          className="w-full mt-1 px-1.5 py-1 rounded text-lg border-amber-500 border-2 text-zinc-800 focus:outline-none focus:ring-amber-400 focus:ring-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      <div className="input-group min-w-max">
        <label htmlFor="region" className="block text-md tracking-tight">
          REGIJA
        </label>
        <select
          name="region"
          id="region"
          className="mt-1 px-1.5 py-1 rounded text-lg border-amber-500 border-2 text-zinc-800 focus:outline-none focus:ring-amber-400 focus:ring-1"
        >
          <option value="afrika" className="text-zinc-800">
            Afrika
          </option>
        </select>
      </div>
    </div>
  )
}
