import type { StudentsT } from '../data/util'

export const getStudentAverage = (grades: number[]) => {
  const gradesSum = gradeSum(grades)
  if (gradesSum === 1) return 1
  return Math.round((gradesSum / grades.length) * 100) / 100
}

const gradeSum = (grades: number[]) => {
  if (grades.some((grade) => grade === 1)) return 1
  return grades.reduce((acc, curr) => acc + curr, 0)
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
