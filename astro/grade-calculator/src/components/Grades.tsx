import { useMemo, useRef, useState } from 'react'
import {
  getClassNumberFromLS,
  getStudentsFromLS,
  getSubjects,
  saveToLS,
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
  const [isGradeSaving, setIsGradeSaving] = useState(false)
  const [isInputingGrade, setIsInputingGrade] = useState(true)

  const gradeElRef = useRef<HTMLParagraphElement>(null)

  async function next(grade: number) {
    setIsGradeSaving(true)
    gradeElRef.current!.innerText = '' + grade
    // Show selected grade for fev seconds
    await new Promise((resolve) => {
      setTimeout(resolve, 700)
    })
    gradeElRef.current!.innerText = ''

    // !!! MUTATE state using reference !!!
    const studentGrades = state.students[state.studentIndex].grades
    if (studentGrades.length > state.subjectIndex) {
      // edit grade
      studentGrades[state.subjectIndex] = grade
    } else {
      // new grade
      studentGrades.push(grade)
    }
    // -- END MUTAUTE !!!
    setIsGradeSaving(false)

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
        setIsInputingGrade(false)
        saveToLS({ students: state.students })
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
    <>
      {/* inputing grades */}
      {isInputingGrade && (
        <div>
          <p>Broj u dnevniku: {students[state.studentIndex].id}</p>
          <p>Ime i prezime učenika: {getFullStudentName()}</p>

          <p className="mt-2">Predmet:</p>
          <div className="flex gap-4 text-xl">
            <p>{subjects[state.subjectIndex]}</p>
            <p ref={gradeElRef}>
              {state.students[state.studentIndex].grades[state.subjectIndex] ||
                ''}
            </p>
          </div>

          {!isGradeSaving && (
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
          )}
        </div>
      )}

      {/* Input is finish show options for next step */}
      {!isInputingGrade && (
        <div>
          <p>Provjeriti ocjene</p>
          <p>Dalje do rezultata</p>
        </div>
      )}
    </>
  )
}
