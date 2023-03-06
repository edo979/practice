import { useMemo, useState } from 'react'
import { getClassNumberFromLS, getSubjects } from '../data/util'

export default function Grades() {
  // TODO check subject, handle if subjects empty
  const subjects = useMemo(() => {
    console.log('call LS')
    return getSubjects(getClassNumberFromLS()) || []
  }, [])

  const [state, setState] = useState({ currentGrade: 5 })

  function handleGrade(grade: number) {
    setState((prev) => ({ ...prev, currentGrade: grade }))
  }

  console.log('render')

  return (
    <div>
      <p>Broj u dnevniku</p>
      <p>Ime i prezime učenika</p>

      <p className="mt-2">Predmet:</p>
      <p className="text-xl">{subjects[0]}</p>

      <label htmlFor="grade" className="mt-2 block">
        Ocjena:
      </label>
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

      <div className="mt-2  flex gap-1">
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
