import type { StudentsT } from '../data/util'

// STUDENTS CALCULATIOn
export const getStudentAverage = (grades: number[]) => {
  const gradesSum = gradeSum(grades)
  if (gradesSum === 1) return 1
  return Math.round((gradesSum / grades.length) * 100) / 100
}

const gradeSum = (grades: number[]) => {
  if (grades.some((grade) => grade === 1)) return 1
  return grades.reduce((acc, curr) => acc + curr, 0)
}

// CLASS CALCULATION
export const getClassResults = (students: StudentsT[]) => {
  const studentsAverage = students.map((student) =>
    getStudentAverage(student.grades)
  )

  const failsCount = (() =>
    students.reduce(
      (acc, curr) => {
        const failGradesCount = curr.grades.filter(
          (grade) => grade === 1
        ).length

        if (failGradesCount === 1) {
          return { ...acc, 1: acc[1] + 1 }
        } else if (failGradesCount === 2) {
          return { ...acc, 2: acc[2] + 1 }
        } else if (failGradesCount >= 3) {
          return { ...acc, 3: acc[3] + 1 }
        }

        return { ...acc }
      },
      { 1: 0, 2: 0, 3: 0 }
    ))()

  const classAverage = () => {
    const average =
      studentsAverage.reduce((acc, curr) => acc + Math.round(curr), 0) /
      studentsAverage.length
    return Math.round(average * 100) / 100
  }

  const gradeAverage = () => {
    const grades = students.flatMap((student) => student.grades)
    const gradesSum = grades.reduce((acc, curr) => acc + curr, 0)

    return Math.round((gradesSum / grades.length) * 100) / 100
  }

  return [
    studentsAverage.filter((average) => 4.5 <= average).length,
    studentsAverage.filter((average) => average >= 3.5 && average < 4.5).length,
    studentsAverage.filter((average) => average >= 2.5 && average < 3.5).length,
    studentsAverage.filter((average) => average >= 1.5 && average < 2.5).length,
    studentsAverage.filter((average) => average > 1).length,
    failsCount[1],
    failsCount[2],
    failsCount[3],
    studentsAverage.filter((average) => average === 1).length,
    classAverage(),
    gradeAverage(),
  ]
}

// SUBJECTS CALCULATION
export const subjetGradeCount = (
  students: StudentsT[],
  subjectIndex: number,
  gradeToCalulate: number
) => {
  return students.reduce(
    (gradeCount, student) =>
      student.grades[subjectIndex] === gradeToCalulate
        ? gradeCount + 1
        : gradeCount,
    0
  )
}

export const subjectPassStudentsCount = (
  students: StudentsT[],
  subjectIndex: number
) => {
  const fail = subjetGradeCount(students, subjectIndex, 1)
  return students.length - fail
}

export const subjectFailStudentsCount = (
  students: StudentsT[],
  subjectIndex: number
) => {
  return subjetGradeCount(students, subjectIndex, 1)
}

export const subjectAverage = (students: StudentsT[], subjectIndex: number) => {
  const gradesSum = students.reduce(
    (sum, student) => student.grades[subjectIndex] + sum,
    0
  )

  return Math.round((gradesSum / students.length) * 100) / 100
}
