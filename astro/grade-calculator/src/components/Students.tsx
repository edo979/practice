import { useEffect, useRef, useState } from 'react'
import {
  getLangFromLS,
  getNextStudentID,
  getStudentsFromLS,
  saveToLS,
  StudentsT,
} from '../data/util'

type StateT = {
  students: StudentsT[]
  id: number
  lang: string
}

export default function Students() {
  const [state, setState] = useState<StateT>({
    id: getNextStudentID(),
    students: getStudentsFromLS(),
    lang: getLangFromLS(),
  })
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const langRef = useRef<HTMLSelectElement>(null)
  const idRef = useRef<HTMLInputElement>(null)
  const [isEditingStudents, setIsEditingStudens] = useState(false)

  const handleAddStudent = () => {
    if (!firstNameRef.current || !lastNameRef.current || !langRef.current)
      return

    const firstName = firstNameRef.current.value
    const lastName = lastNameRef.current.value
    const lang = langRef.current.value

    setState((prev) => {
      return {
        ...prev,
        id: prev.id + 1,
        students: [
          ...prev.students,
          {
            id: prev.id,
            firstName: firstName,
            lastName: lastName,
            grades: [],
            lang,
          },
        ],
      }
    })

    firstNameRef.current.value = ''
    lastNameRef.current.value = ''
  }

  const handleDeleteStudent = (id: number) => {
    if (
      !confirm(
        `Sigurno želite izbrisati učenika | učenicu: ${
          state.students.find((student) => student.id === id)?.firstName || ''
        }?`
      )
    )
      return

    setState((prev) => {
      const students = prev.students
        .filter((student) => student.id !== id)
        .map((student, i) => ({ ...student, id: i + 1 }))

      return { ...prev, students }
    })
  }

  const handleStudentFirstNameUpdate = (id: number, firstName: string) => {
    setState((prev) => {
      const students = prev.students.filter((student) => {
        if (student.id !== id) return student
        return (student.firstName = firstName)
      })
      return { ...prev, students }
    })
  }

  const handleStudentLastNameUpdate = (id: number, lastName: string) => {
    setState((prev) => {
      const students = prev.students.filter((student) => {
        if (student.id !== id) return student
        return (student.lastName = lastName)
      })
      return { ...prev, students }
    })
  }

  useEffect(() => {
    saveToLS({ students: state.students })
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
            handleAddStudent()
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

          {state.lang === 'nt' && (
            <div>
              <label htmlFor="lang" className="mt-4 block">
                Drugi strani jezik:
              </label>
              <select
                name="lang"
                id="lang"
                className="w-full py-1 px-2 border-2 border-emerald-500 rounded focus-visible:outline-emerald-700"
                ref={langRef}
              >
                <option value="nje">Njemački</option>
                <option value="tur">Turski</option>
              </select>
            </div>
          )}

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
            ✔ Snimi i Nastavi
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

          <ul className="mt-4 py-4 sm:text-lg">
            {state.students.map((student) => (
              <li
                key={student.id}
                className="px-2 py-2 flex items-center even:bg-emerald-100"
              >
                <span>{student.id}.</span>
                <div className="flex">
                  <input
                    type="text"
                    className="w-1/2 px-1 py-0.5 ml-1 rounded border border-emerald-700"
                    value={student.firstName}
                    onChange={(e) =>
                      handleStudentFirstNameUpdate(student.id, e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="w-1/2 px-1 py-0.5 ml-1 rounded border border-emerald-700"
                    value={student.lastName}
                    onChange={(e) =>
                      handleStudentLastNameUpdate(student.id, e.target.value)
                    }
                  />
                </div>

                <button
                  className="ml-auto"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end gap-4">
            <button
              className="btn px-4"
              onClick={() => setIsEditingStudens(false)}
            >
              ✔ Gotovo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
