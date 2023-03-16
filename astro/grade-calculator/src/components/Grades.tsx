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
        ]?.toString() || '')
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
    const prevSubjectIndex = state.subjectIndex - 1

    if (prevSubjectIndex < 0) return

    setState((prev) => ({ ...prev, subjectIndex: prevSubjectIndex }))
  }

  function handleGoToNextSubject() {
    const nextSubjectIndex = state.subjectIndex + 1

    if (nextSubjectIndex >= subjects.length) return

    setState((prev) => ({ ...prev, subjectIndex: nextSubjectIndex }))
  }

  function handleGoToNextStudent() {
    const nextStudentIndex = state.studentIndex + 1

    if (nextStudentIndex >= state.students.length) return

    setState((prev) => ({ ...prev, studentIndex: nextStudentIndex }))
  }

  function handleGoToPrevStudent() {
    const prevStudentIndex = state.studentIndex - 1

    if (prevStudentIndex < 0) return

    setState((prev) => ({ ...prev, studentIndex: prevStudentIndex }))
  }

  function getFullStudentName() {
    return (
      students[state.studentIndex].firstName +
      ' ' +
      students[state.studentIndex].lastName
    )
  }

  function getSubjectName() {
    if (state.subjectIndex === 2) {
      return state.students[state.studentIndex].lang === 'nje'
        ? 'Njemački jezik'
        : 'Turski jezik'
    }
    return subjects[state.subjectIndex]
  }

  return (
    <>
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
        <div className="sm:flex sm:justify-between sm:gap-8">
          <section className="sm:flex-1 md:basis-96 md:flex-initial">
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
                  {getSubjectName()}
                </p>
                <p ref={gradeRef} className="font-semibold text-5xl"></p>
              </div>
            </div>
          </section>

          <div className="ml-auto w-fit sm:basis-72">
            {!isGradeSaving && (
              <section className="mt-4 flex justify-betwee gap-8 items-center">
                <div>
                  <p className="text-lg text-center font-semibold">Učenik:</p>
                  <button
                    className="btn w-full"
                    onClick={handleGoToPrevStudent}
                  >
                    👈 Prethodni
                  </button>

                  <button
                    className="btn mt-2 w-full"
                    onClick={handleGoToNextStudent}
                  >
                    Naredni 👉
                  </button>

                  <p className="mt-4 text-lg text-center font-semibold">
                    Predmet:
                  </p>
                  <button
                    className="btn mb-2 w-full"
                    onClick={handleGoToPreviusSubject}
                  >
                    👈 Prethodni
                  </button>

                  <button
                    className="btn w-full"
                    onClick={handleGoToNextSubject}
                  >
                    Naredni 👉
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
    </>
  )
}
