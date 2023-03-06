import { useMemo, useState } from 'react'
import { getClassNumberFromLS, getSubjects } from '../data/util'

export default function Grades() {
  const subjects = useMemo(() => {
    console.log('call LS')
    return getSubjects(getClassNumberFromLS())
  }, [])

  const [state, setState] = useState({ currentGrade: 5 })

  function handleGrade(grade: number) {
    setState((prev) => ({ ...prev, currentGrade: grade }))
  }

  console.log('render')

  return (
    <div>
      <p>Ime i prezime učenika</p>
      <p>Predmet:</p>
      <p className="text-xl">Bosanski</p>
      <label htmlFor="grade">Ocjena:</label>
      <input
        type="number"
        name="grade"
        id="grade"
        min={1}
        max={5}
        className="border block"
        value={state.currentGrade}
        disabled
      />

      <div className="flex gap-1">
        <button className="btn" onClick={() => handleGrade(1)}>
          1
        </button>
        <button className="btn" onClick={() => handleGrade(2)}>
          2
        </button>
        <button className="btn" onClick={() => handleGrade(3)}>
          3
        </button>
        <button className="btn" onClick={() => handleGrade(4)}>
          4
        </button>
        <button className="btn" onClick={() => handleGrade(5)}>
          5
        </button>
      </div>
    </div>
  )
}
