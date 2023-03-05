import { useEffect, useRef, useState } from 'react'
import { getNextStudentID, getStudentsFromLS, saveToLS } from '../data/util'

type StateT = {
  students: { id: number; firstName: string; lastName: string }[]
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
    <form
      className="max-w-sm"
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
        className="w-full border"
        value={state.id}
        onChange={(e) =>
          setState((prev) => ({ ...prev, id: parseInt(e.target.value) }))
        }
      />

      <label htmlFor="firstName" className="block">
        Ime:
      </label>
      <input
        ref={firstNameRef}
        type="text"
        name="firstName"
        id="firstName"
        required
        className="w-full border"
      />

      <label htmlFor="lastName" className="block">
        Prezime:
      </label>
      <input
        ref={lastNameRef}
        type="text"
        name="lastName"
        id="lastName"
        required
        className="w-full border"
      />

      <div className="flex flex-col gap-4">
        <button type="submit" className="btn">
          Naredni učenik
        </button>

        <div className="self-center">
          <p>Naredni korak:</p>
          <button
            type="button"
            className="btn"
            onClick={() => saveToLS({ students: state.students })}
          >
            Unos ocjena
          </button>
        </div>
      </div>
    </form>
  )
}
