import { useEffect, useState } from 'react'
import { getSubjects } from '../data/util'

export default function ClassNumber() {
  const [classNumber, setClassNumber] = useState<string>('')
  const [subjects, setSubjects] = useState<string[]>()

  useEffect(() => {
    setSubjects(getSubjects(classNumber))
  }, [classNumber])

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

      {subjects && (
        <section>
          <h2>Predmeti za razred:</h2>

          <ul>
            {subjects.map((sub) => (
              <li key={sub}>{sub}</li>
            ))}
          </ul>

          <a href="imenik">Dalje</a>
        </section>
      )}
    </div>
  )
}
