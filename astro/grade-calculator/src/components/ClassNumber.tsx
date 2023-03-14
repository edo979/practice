import { useEffect, useState } from 'react'
import {
  getClasesFromLS,
  getClassNumberFromLS,
  getSubjects,
  saveToLS,
} from '../data/util'

export default function ClassNumber() {
  const classNumberFromLS = getClassNumberFromLS()
  const [classNumber, setClassNumber] = useState<string>(classNumberFromLS)
  const [subjects, setSubjects] = useState<string[]>()
  const [error, setError] = useState(false)
  const LSClases = getClasesFromLS()

  useEffect(() => {
    setSubjects(getSubjects(classNumber))
  }, [classNumber])

  function handleSetClassName() {
    if (classNumber === '0') {
      setError(true)
    } else {
      setError(false)
      saveToLS({ classNumber })
      location.href = '/imenik'
    }
  }

  function handleClassChange(className: string) {
    if (className !== '0') setError(false)
    setClassNumber(className)
  }

  return (
    <div className="sm:flex sm:gap-4 md:gap-8">
      <section className="flex-1">
        <h1 className="mt-4 text-2xl font-bold md:text-5xl md:mt-8">
          Izaberite Razred
        </h1>

        {classNumberFromLS !== '0' && (
          <div className="mt-8">
            <h2 className="text-xl font-bold">Sačuvani podaci:</h2>
            <p>Na uređaju su sačuvani podaci za {classNumberFromLS} razred.</p>
          </div>
        )}

        <div className="mt-8 text-lg text-right sm:text-xl sm:text-left">
          <label htmlFor="subjects">Razred:</label>

          <select
            name="subjects"
            id="subjects"
            className="w-44 ml-2 py-1 px-2 border-2 border-emerald-500 rounded focus-visible:outline-emerald-700"
            defaultValue={classNumber}
            onChange={(e) => handleClassChange(e.target.value)}
          >
            <option value="0">Izaberi Razred</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
      </section>

      {subjects && (
        <section className="mt-8 flex-1 sm:mt-5">
          <div className="flex flex-col items-end">
            <p>Naredni korak 👉</p>
            <button className="mt-2 btn text-lg" onClick={handleSetClassName}>
              🏃‍♀️ Imenik Učenika
            </button>
          </div>

          <h2 className="mt-8 text-xl font-bold md:text-3xl">
            Predmeti za razred:
          </h2>

          <div
            className={`mt-2 p-4 rounded border ${
              error ? 'border-rose-500' : 'border-emerald-500'
            }`}
          >
            <ul className="ml-4 text-lg list-disc">
              {subjects.map((sub) => (
                <li key={sub} className="list-item">
                  {sub}
                </li>
              ))}
            </ul>
          </div>
          {error && <p className="text-rose-500">Izaberite razred!</p>}
        </section>
      )}
    </div>
  )
}
