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
    <div className="max-w-sm">
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
          className="max-w-sm w-full py-1 px-2 border-2 border-emerald-500 rounded focus-visible:outline-emerald-700"
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
          className="max-w-sm w-full py-1 px-2 border-2 border-emerald-500 rounded focus-visible:outline-emerald-700"
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
          className="max-w-sm w-full py-1 px-2 border-2 border-emerald-500 rounded focus-visible:outline-emerald-700"
          placeholder="Prezime ili prvo slovo..."
        />

        <div className="flex justify-end">
          <button type="submit" className="mt-4 btn">
            Dodaj učenika
          </button>
        </div>
      </form>

      <h2 className="mt-8 text-xl font-bold md:text-3xl">Imenik</h2>
      <ul className="mt-4 text-lg">
        {state.students.map((student) => (
          <li key={student.id}>
            {student.id}. {student.firstName} {student.lastName}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col items-end">
        <button
          type="button"
          className="mt-2 btn text-lg"
          onClick={() => {
            saveToLS({ students: state.students })
            location.href = '/ocjene'
          }}
        >
          ✔ Završi imenik učenika
        </button>
        <p className="mt-2 text-lg">Naredni korak 👉 Unos ocjena</p>
      </div>
    </div>
  )
}
