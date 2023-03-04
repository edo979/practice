import { useAppStore } from './IndexRoute'

export default function ClassNumberRoute() {
  const { appState, setClassNumber } = useAppStore()

  const handleClassName = () => {}

  return (
    <div>
      <h1>Izaberite Razred</h1>

      <section>
        <label htmlFor="subjects">Razredi:</label>

        <select
          name="subjects"
          id="subjects"
          onChange={(e) => setClassNumber(e.target.value)}
        >
          <option value="0">Izaberi Razred</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </section>

      {appState.subjects && (
        <section>
          <h2>Predmeti za razred:</h2>

          <ul>
            {appState.subjects.map((sub) => (
              <li key={sub}>{sub}</li>
            ))}
          </ul>

          <button className="bg-blue-200" onClick={handleClassName}>
            Dalje
          </button>
        </section>
      )}
    </div>
  )
}
