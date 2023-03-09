import { useEffect, useMemo, useRef, useState } from 'react'
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

  const gradeRef = useRef<HTMLParagraphElement>(null)

  const [state, setState] = useState({
    subjectIndex: 0,
    studentIndex: 0,
    students,
  })
  const [isGradeSaving, setIsGradeSaving] = useState(false)

  useEffect(() => {
    gradeRef.current!.innerText =
      state.students[state.studentIndex].grades[
        state.subjectIndex
      ].toString() || ''
  })

  async function next(grade: number) {
    setIsGradeSaving(true)
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

    // wait 700 miliseconds
    gradeRef.current!.innerText = grade.toString()
    await new Promise((resolve) => setTimeout(resolve, 700))
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
        saveToLS({ students: state.students })
        location.href = 'provjera-ocjena'
        return
      }
    }
  }

  function handleGoToPreviusSubject() {
    if (state.subjectIndex - 1 < 0) {
      setState((prev) => ({
        ...prev,
        studentIndex: prev.studentIndex - 1,
        subjectIndex: subjects.length - 1,
      }))
    } else {
      setState((prev) => ({
        ...prev,
        subjectIndex: prev.subjectIndex - 1,
      }))
    }
  }

  function handleGoToNextSubject() {
    if (state.subjectIndex + 1 < subjects.length) {
      setState((prev) => ({
        ...prev,
        subjectIndex: prev.subjectIndex + 1,
      }))
    } else {
      setState((prev) => ({
        ...prev,
        subjectIndex: 0,
        studentIndex: prev.studentIndex + 1,
      }))
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
    <div className="max-w-sm">
      <div>
        <p>Broj u dnevniku: {students[state.studentIndex].id}</p>
        <p>Ime i prezime učenika: {getFullStudentName()}</p>

        <p className="mt-2">Predmet:</p>
        <div className="flex gap-4 text-xl">
          <p>{subjects[state.subjectIndex]}</p>
          <p ref={gradeRef}></p>
        </div>

        {!isGradeSaving && (
          <div className="mt-2 flex gap-1">
            {(!!state.subjectIndex || !!state.studentIndex) && (
              <button className="btn" onClick={handleGoToPreviusSubject}>
                👈 Nazad
              </button>
            )}

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

            {(state.studentIndex + 1 < state.students.length ||
              state.subjectIndex + 1 < subjects.length) && (
              <button className="btn" onClick={handleGoToNextSubject}>
                Naprijed 👉
              </button>
            )}
          </div>
        )}
      </div>

      {state.subjectIndex === subjects.length - 1 &&
        state.studentIndex === state.students.length - 1 && (
          <div>
            <button
              className="btn"
              onClick={() => {
                saveToLS({ students: state.students })
                location.href = 'rezultati'
              }}
            >
              Rezultati
            </button>

            <button
              className="btn"
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  subjectIndex: 0,
                  studentIndex: 0,
                }))
              }
            >
              Provjera Unosa Ocjena
            </button>
          </div>
        )}
    </div>
  )
}
