import { useState } from 'react'

type SearchBarProps = {
  search: (name: string, region: string) => void
}

export default function SeacrhBar({ search }: SearchBarProps) {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('All')

  return (
    <form
      className="mt-8 flex flex-row items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        search(name, region)
      }}
    >
      <div className="input-group max-w-md flex-1">
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
      </div>

      <div className="input-group min-w-max">
        <label htmlFor="region" className="block text-md tracking-tight">
          REGIJA
        </label>
        <select
          name="region"
          id="region"
          className="mt-1 px-1.5 py-1 rounded text-lg border-amber-500 border-2 text-zinc-800 font-semibold focus:outline-none focus:ring-amber-400 focus:ring-1"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="All">Sve regije</option>
          <option value="Asia">Azija</option>
          <option value="Africa">Afrika</option>
          <option value="Americas">Amerika</option>
          <option value="Antarctic">Antarktika</option>
          <option value="Europe">Evropa</option>
          <option value="Oceania">Australija</option>
        </select>
      </div>

      <button className="btn btn-primary self-end" type="submit">
        Traži
      </button>
    </form>
  )
}
