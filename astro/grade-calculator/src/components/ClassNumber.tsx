import { useEffect, useState } from 'react'
import {
  deleteLS,
  getClassNumberFromLS,
  getLangFromLS,
  getSubjects,
  saveToLS,
} from '../data/util'

export default function ClassNumber() {
  const classNumberFromLS = getClassNumberFromLS()
  const [classNumber, setClassNumber] = useState<string>(classNumberFromLS)
  const [subjects, setSubjects] = useState<string[]>()
  const [error, setError] = useState({ classNumber: false, lang: false })
  const [lang, setLang] = useState<string>(getLangFromLS() ?? '')

  useEffect(() => {
    setSubjects(getSubjects(classNumber))
  }, [classNumber])

  function handleSetClassName() {
    if (classNumber === '0' || lang === undefined) {
      if (classNumber === '0')
        setError((prev) => ({ ...prev, classNumber: true }))

      if (lang === undefined) setError((prev) => ({ ...prev, lang: true }))
    } else {
      setError({ classNumber: false, lang: false })
      saveToLS({ classNumber, lang })
      location.href = '/imenik'
    }
  }

  function handleClassChange(className: string) {
    if (className !== '0') setError((prev) => ({ ...prev, classNumber: false }))
    setClassNumber(className)
  }

  function handleDeleteLS() {
    if (!confirm('Sačuvani podaci će biti izbrisani!')) return
    deleteLS()
    setClassNumber('0')
  }

  function handleLanguage(value: string) {
    setError((prev) => ({ ...prev, lang: false }))
    setLang(value)
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
            <div className="text-right sm:text-left">
              <button className="btn mt-2 bg-rose-400" onClick={handleDeleteLS}>
                ❌Izbriši
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-lg text-right sm:mt-16 sm:text-xl sm:text-left">
          <label htmlFor="subjects">Razred:</label>

          <select
            name="subjects"
            id="subjects"
            className={`w-44 ml-2 py-1 px-2 border-2 rounded ${
              error.classNumber
                ? 'border-rose-400  focus-visible:outline-rose-700'
                : 'border-emerald-500  focus-visible:outline-emerald-700'
            }`}
            value={classNumber}
            onChange={(e) => handleClassChange(e.target.value)}
          >
            <option value="0">Izaberi Razred</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>

          {error.classNumber && (
            <p className="text-rose-500 text-sm">Izaberite razred!</p>
          )}
        </div>

        <fieldset
          className={`mt-4 px-8 py-2 rounded border-2  text-right ${
            error.lang ? 'border-rose-400' : 'border-emerald-500'
          }`}
        >
          <legend className="px-2">Drugi strani jezik</legend>
          <div className="mt-2">
            <label htmlFor="nje" className="mr-2">
              Njemački
            </label>
            <input
              type="radio"
              name="language"
              id="nje"
              value="nje"
              onChange={(e) => handleLanguage(e.target.value)}
              checked={lang === 'nje'}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="tur" className="mr-2">
              Turski
            </label>
            <input
              type="radio"
              name="language"
              id="tur"
              value="tur"
              onChange={(e) => handleLanguage(e.target.value)}
              checked={lang === 'tur'}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="nt" className="mr-2">
              Njemački i Turski
            </label>
            <input
              type="radio"
              name="language"
              id="nt"
              value="nt"
              onChange={(e) => handleLanguage(e.target.value)}
              checked={lang === 'nt'}
            />
          </div>
        </fieldset>

        {error.lang && (
          <p className="text-rose-500 text-sm text-right">
            Izaberite strani jezik!
          </p>
        )}
      </section>

      {subjects && (
        <section className="mt-8 flex-1 sm:mt-5">
          <div className="flex flex-col items-end">
            <button className="mt-2 btn text-lg" onClick={handleSetClassName}>
              💾 Spremi i Nastavi
            </button>
          </div>

          <h2 className="mt-8 text-xl font-bold md:text-3xl">
            Predmeti za razred:
          </h2>

          <div className="mt-2 p-4 rounded border border-emerald-500">
            <ul className="ml-4 text-lg list-disc">
              {subjects.map((sub) => (
                <li key={sub} className="list-item">
                  {sub}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}
