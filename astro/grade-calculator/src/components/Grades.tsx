import { useMemo, useRef, useState } from 'react'
import {
  getClassNumberFromLS,
  getStudentsFromLS,
  getSubjects,
} from '../data/util'

export default function Grades() {
  // TODO check subject, handle if subjects empty
  const subjects = useMemo(() => {
    console.log('call LS')
    return getSubjects(getClassNumberFromLS()) || []
  }, [])

  const students = useMemo(() => {
    console.log('call LS')
    return getStudentsFromLS() || []
  }, [])

  const [state, setState] = useState({
    subjectIndex: 0,
    studentIndex: 0,
    students,
  })
  const gradeElRef = useRef<HTMLParagraphElement>(null)

  async function next(grade: number) {
    gradeElRef.current!.innerText = '' + grade
    // Show selected grade for fev seconds
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    gradeElRef.current!.innerText = ''

    // !!! MUTATE state using reference !!!
    state.students[state.studentIndex].grades.push(grade)
    // -- END MUTAUTE !!!

    const nextSubjectIndex = state.subjectIndex + 1
    if (nextSubjectIndex < subjects.length) {
      setState((prev) => ({
        ...prev,
        subjectIndex: nextSubjectIndex,
      }))
    } else {
      const nextStudentIndex = state.studentIndex + 1
      if (nextStudentIndex < students.length) {
        setState((prev) => ({
          ...prev,
          studentIndex: nextStudentIndex,
          subjectIndex: 0,
        }))
      } else {
        console.log('input is finish')
      }
    }
  }

  function getFullStudentName() {
    return (
      students[state.studentIndex].firstName +
      ' ' +
      students[state.studentIndex].lastName
    )
  }

  console.log('render')

  return (
    <div>
      <p>Broj u dnevniku: {students[state.studentIndex].id}</p>
      <p>Ime i prezime učenika: {getFullStudentName()}</p>

      <p className="mt-2">Predmet:</p>
      <div className="flex gap-4 text-xl">
        <p>{subjects[state.subjectIndex]}</p>
        <p ref={gradeElRef}></p>
      </div>

      <div className="mt-2  flex gap-1">
        <button className="btn" onClick={() => next(1)}>
          1
        </button>
        <button className="btn" onClick={() => next(2)}>
          2
        </button>
        <button className="btn" onClick={() => next(3)}>
          3
        </button>
        <button className="btn" onClick={() => next(4)}>
          4
        </button>
        <button className="btn" onClick={() => next(5)}>
          5
        </button>
      </div>
    </div>
  )
}
