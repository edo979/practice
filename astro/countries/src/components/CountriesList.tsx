export default function CountriesList() {
  return (
    <div>
      <div className="mt-4 flex flex-row items-center justify-between gap-4">
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
          />
        </div>

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
    </div>
  )
}
