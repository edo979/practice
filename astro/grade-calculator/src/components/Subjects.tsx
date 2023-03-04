import { useState } from 'react'
import { subjects } from '../data/subjects'

type StateT = {
  classNumber?: string
  subjects?: string[]
}

export default function Subjects() {
  const [state, setState] = useState<StateT>({
    classNumber: '6',
  })

  return (
    <div>
      <h1>Izaberite Razred</h1>

      <section>
        <label htmlFor="subjects">Razredi:</label>

        <select
          name="subjects"
          id="subjects"
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              classNumber: e.target.value,
            }))
          }
        >
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </section>

      {state.classNumber && (
        <section>
          <h2>Predmeti za razred:</h2>

          <ul>
            {subjects.hed[state.classNumber].map((sub) => (
              <li key={sub}>{sub}</li>
            ))}
          </ul>

          <button className="bg-blue-200">Dalje</button>
        </section>
      )}
    </div>
  )
}
