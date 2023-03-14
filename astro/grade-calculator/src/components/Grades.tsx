import { useEffect, useMemo, useRef, useState } from 'react'
import {
  getClassNumberFromLS,
  getStudentsFromLS,
  getSubjects,
  saveToLS,
} from '../data/util'

export default function Grades() {
  const subjects = useMemo(() => {
    return getSubjects(getClassNumberFromLS()) || []
  }, [])

  const students = useMemo(() => {
    return getStudentsFromLS() || []
  }, [])

  const gradeRef = useRef<HTMLParagraphElement>(null)

  const [state, setState] = useState({
    subjectIndex: 0,
    studentIndex: 0,
    students,
  })
  const [isGradeSaving, setIsGradeSaving] = useState(false)
  const [isInputFinish, setIsInputFinish] = useState(false)

  useEffect(() => {
    // show grade from LS if exist
    gradeRef.current &&
      (gradeRef.current.innerText =
        state.students[state.studentIndex].grades[
          state.subjectIndex
        ].toString() || '')
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

    saveToLS({ students: state.students })

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
        // finish input
        setIsInputFinish(true)
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
      if (state.studentIndex + 1 >= students.length) {
        setState((prev) => ({
          ...prev,
          subjectIndex: 0,
        }))
        setIsInputFinish(true)
      }

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

  return (
    <div className="max-w-sm">
      {isInputFinish ? (
        <div>
          <a href="rezultati">
            <button className="btn">Rezultati</button>
          </a>

          <button
            className="btn"
            onClick={() => {
              setState((prev) => ({
                ...prev,
                subjectIndex: 0,
                studentIndex: 0,
              }))
              setIsInputFinish(false)
            }}
          >
            Provjera Unosa Ocjena
          </button>
        </div>
      ) : (
        <div>
          <h1 className="mt-4 text-2xl font-bold md:text-5xl md:mt-8">
            Ocjene
          </h1>
          <div className="mt-4 text-lg text-right">
            <div className="flex justify-between">
              <p>Broj u dnevniku:</p>
              <span className="font-semibold text-xl">
                {students[state.studentIndex].id}
              </span>
            </div>

            <div className="flex justify-between">
              <p>Ime i prezime:</p>
              <span className="font-semibold text-xl">
                {getFullStudentName()}
              </span>
            </div>

            <div className="flex items-top gap-4">
              <p>Predmet:</p>
              <p className="ml-auto font-semibold text-2xl">
                {subjects[state.subjectIndex]}
              </p>
              <p ref={gradeRef} className="font-semibold text-5xl"></p>
            </div>
          </div>

          <div className="min-h-[328px]">
            {!isGradeSaving && (
              <section className="mt-4 flex justify-between items-center">
                <div>
                  {(state.subjectIndex > 0 || state.studentIndex > 0) && (
                    <button
                      className="btn w-40"
                      onClick={handleGoToPreviusSubject}
                    >
                      👈 Nazad
                    </button>
                  )}
                  <button className="btn w-40" onClick={handleGoToNextSubject}>
                    Naprijed 👉
                  </button>
                </div>

                <div className="mt-2 flex flex-col-reverse items-end gap-4">
                  <button className="btn w-20 text-xl" onClick={() => next(1)}>
                    1
                  </button>
                  <button className="btn w-20 text-xl" onClick={() => next(2)}>
                    2
                  </button>
                  <button className="btn w-20 text-xl" onClick={() => next(3)}>
                    3
                  </button>
                  <button className="btn w-20 text-xl" onClick={() => next(4)}>
                    4
                  </button>
                  <button className="btn w-20 text-xl" onClick={() => next(5)}>
                    5
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
