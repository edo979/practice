import { useEffect, useRef, useState } from 'react'
import {
  getNextStudentID,
  getStudentsFromLS,
  saveToLS,
  StudentsT,
} from '../data/util'

type StateT = {
  students: StudentsT[]
  id: number
}

export default function Students() {
  const [state, setState] = useState<StateT>({
    id: getNextStudentID(),
    students: getStudentsFromLS(),
  })
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const idRef = useRef<HTMLInputElement>(null)
  const [isEditingStudents, setIsEditingStudens] = useState(true)

  const handleStudentsData = () => {
    if (!firstNameRef.current || !lastNameRef.current) return

    const firstName = firstNameRef.current.value
    const lastName = lastNameRef.current.value

    setState((prev) => {
      return {
        id: prev.id + 1,
        students: [
          ...prev.students,
          {
            id: prev.id,
            firstName: firstName,
            lastName: lastName,
            grades: [],
          },
        ],
      }
    })

    firstNameRef.current.value = ''
    lastNameRef.current.value = ''
  }

  useEffect(() => {
    firstNameRef.current?.focus()
  }, [state])

  return (
    <div className="sm:flex sm:gap-16 lg:gap-32">
      <section>
        <h1 className="mt-4 text-2xl font-bold md:text-5xl md:mt-8">
          Imenik učenika
        </h1>

        <form
          className="mt-8 text-lg"
          onSubmit={(e) => {
            e.preventDefault()
            handleStudentsData()
          }}
        >
          <label htmlFor="id" className="block">
            Broj Dnevnika:
          </label>
          <input
            ref={idRef}
            type="number"
            name="id"
            id="id"
            required
            className="w-full py-1 px-2 border-2 border-emerald-500 rounded focus-visible:outline-emerald-700"
            value={state.id}
            onChange={(e) =>
              setState((prev) => ({ ...prev, id: parseInt(e.target.value) }))
            }
          />

          <label htmlFor="firstName" className="mt-4 block">
            Ime:
          </label>
          <input
            ref={firstNameRef}
            type="text"
            name="firstName"
            id="firstName"
            required
            className="w-full py-1 px-2 border-2 border-emerald-500 rounded focus-visible:outline-emerald-700"
            placeholder="Ime učenika..."
          />

          <label htmlFor="lastName" className="mt-4 block">
            Prezime:
          </label>
          <input
            ref={lastNameRef}
            type="text"
            name="lastName"
            id="lastName"
            required
            className="w-full py-1 px-2 border-2 border-emerald-500 rounded focus-visible:outline-emerald-700"
            placeholder="Prezime ili prvo slovo..."
          />

          <div className="flex justify-end">
            <button type="submit" className="mt-4 btn">
              Dodaj učenika
            </button>
          </div>
        </form>
      </section>

      <section className="flex-1">
        <h2 className="mt-8 text-xl font-bold sm:mt-5 md:text-3xl">Imenik:</h2>
        <ul className="mt-4 py-4 rounded border border-emerald-500 text-lg">
          {state.students.map((student) => (
            <li key={student.id} className="px-4 even:bg-emerald-100">
              {student.id}. {student.firstName} {student.lastName}
            </li>
          ))}
        </ul>

        {state.students.length > 0 && (
          <div className="mt-4 text-right">
            <button
              className="btn"
              onClick={() => {
                setIsEditingStudens(true)
              }}
            >
              ✏ Uredi imenik
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-col items-end">
          <button
            type="button"
            className="mt-2 btn text-lg"
            onClick={() => {
              saveToLS({ students: state.students })
              location.href = '/ocjene'
            }}
          >
            ✔ Snimi imenik učenika
          </button>
          <p className="mt-2 text-lg">Naredni korak 👉 Unos ocjena</p>
        </div>
      </section>

      {/* MODAL */}
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full bg-stone-900/75 ${
          isEditingStudents ? '' : 'hidden'
        }`}
      >
        <div className="relative w-full h-full max-w-xl mx-auto p-4 bg-white rounded-lg md:h-auto sm:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold md:text-3xl">Imenik Učenika:</h2>
            <button
              className="text-2xl text-rose-500 hover:font-bold"
              onClick={() => {
                setIsEditingStudens(false)
              }}
            >
              X
            </button>
          </div>

          <div>
            <ul className="mt-4 py-4 rounded border border-emerald-500 sm:text-lg">
              {state.students.map((student) => (
                <li
                  key={student.id}
                  className="px-4 flex items-center justify-between even:bg-emerald-100"
                >
                  <p>
                    {student.id}. {student.firstName} {student.lastName}
                  </p>
                  <div className="text-sm">✏ ❌</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
