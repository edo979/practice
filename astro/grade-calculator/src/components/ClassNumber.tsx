import { useEffect, useState } from 'react'
import { getClassNumberFromLS, getSubjects, saveToLS } from '../data/util'

export default function ClassNumber() {
  const [classNumber, setClassNumber] = useState<string>(getClassNumberFromLS())
  const [subjects, setSubjects] = useState<string[]>()

  useEffect(() => {
    setSubjects(getSubjects(classNumber))
  }, [classNumber])

  function handleClassName() {
    saveToLS({ classNumber })
    location.href = '/imenik'
  }

  return (
    <div>
      <h1>Izaberite Razred</h1>

      <section>
        <label htmlFor="subjects">Razredi:</label>

        <select
          name="subjects"
          id="subjects"
          defaultValue={classNumber}
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

          <p className="mt-4">Naredni korak 👉</p>
          <button className="btn" onClick={handleClassName}>
            🏃‍♀️ Imenik Učenika
          </button>
        </section>
      )}
    </div>
  )
}
