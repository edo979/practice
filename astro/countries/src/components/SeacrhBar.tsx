import { useState } from 'react'

type SearchBarProps = {
  search: (name: string, region: string) => void
}

export default function SeacrhBar({ search }: SearchBarProps) {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('All')

  return (
    <form
      className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
      onSubmit={(e) => {
        e.preventDefault()
        search(name, region)
      }}
    >
      <div className="input-group w-full flex-1 sm:max-w-md">
        <label
          htmlFor="name"
          className="block text-md tracking-tight md:text-lg"
        >
          IME DRŽAVE
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="upiši ime države..."
          className="w-full mt-1 px-1.5 py-1.5 rounded text-lg border-amber-500 border-2 text-zinc-800 focus:outline-none focus:ring-amber-400 focus:ring-1 md:text-xl lg:text-2xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group sm:min-w-max">
        <label
          htmlFor="region"
          className="block text-md tracking-tight md:text-xl"
        >
          KONTINENT
        </label>
        <select
          name="region"
          id="region"
          className="mt-1 px-1.5 py-1.5 w-full rounded text-lg border-amber-500 border-2 text-zinc-800 font-semibold focus:outline-none focus:ring-amber-400 focus:ring-1 md:text-xl lg:text-2xl"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="All">Svi</option>
          <option value="Asia">Azija</option>
          <option value="Africa">Afrika</option>
          <option value="Americas">Amerika</option>
          <option value="Antarctic">Antarktika</option>
          <option value="Europe">Evropa</option>
          <option value="Oceania">Australija</option>
        </select>
      </div>

      <button
        className="mt-4 btn btn-primary sm:mt-0 sm:self-end"
        type="submit"
      >
        Traži
      </button>
    </form>
  )
}
