import { getLangFromLS, StudentsT } from '../data/util'

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

  const resultsData = {
    5: studentsAverage.filter((average) => 4.5 <= average).length,
    4: studentsAverage.filter((average) => average >= 3.5 && average < 4.5)
      .length,
    3: studentsAverage.filter((average) => average >= 2.5 && average < 3.5)
      .length,
    2: studentsAverage.filter((average) => average >= 1.5 && average < 2.5)
      .length,
    1: studentsAverage.filter((average) => average > 1).length,
    studentsPass: studentsAverage.filter((average) => average > 1).length,
    studentsFail: studentsAverage.filter((average) => average === 1).length,
  }

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
    [
      resultsData[5],
      resultsData[4],
      resultsData[3],
      resultsData[2],
      resultsData.studentsPass,
      failsCount[1],
      failsCount[2],
      failsCount[3],
      resultsData.studentsFail,
      classAverage(),
      gradeAverage(),
    ],
    [
      getPercentage(resultsData[5], students.length),
      getPercentage(resultsData[4], students.length),
      getPercentage(resultsData[3], students.length),
      getPercentage(resultsData[2], students.length),
      getPercentage(resultsData.studentsPass, students.length),
      getPercentage(failsCount[1], students.length),
      getPercentage(failsCount[2], students.length),
      getPercentage(failsCount[3], students.length),
      getPercentage(resultsData.studentsFail, students.length),
    ],
  ]
}

const getPercentage = (value: number, total: number) => {
  return Math.round(((100 * value) / total) * 100) / 100 + '%'
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
) => subjetGradeCount(students, subjectIndex, 1)

export const subjectAverage = (students: StudentsT[], subjectIndex: number) => {
  const gradesSum = students.reduce(
    (sum, student) => student.grades[subjectIndex] + sum,
    0
  )

  return Math.round((gradesSum / students.length) * 100) / 100
}

// return [[], [], [] ...]
export const getSubjectsResult = (
  students: StudentsT[],
  subjects: string[]
) => {
  const lang = getLangFromLS()

  const results = subjects.map((subject, i) => {
    let subjectName = subject

    if (i === 2) {
      if (lang === 'tur') subjectName = 'Turski'
      if (lang === 'nje') subjectName = 'Njemački'
    }

    return calculateResults(subjectName, students, i)
  })

  if (lang === 'nt') {
    const nje = calculateResults(
      'Njemački',
      students.filter((student) => student.lang === 'nje'),
      2
    )
    const tur = calculateResults(
      'Turski',
      students.filter((student) => student.lang === 'tur'),
      2
    )

    //  MUTATE ARRAY
    results.splice(2, 1, nje, tur)
    return results
  } else {
    return results
  }
}

const calculateResults = (
  subjectName: string,
  students: StudentsT[],
  subjectIndex: number
) => {
  const formatResults = (result: number) =>
    `${result} (${getPercentage(result, students.length)})`

  const subjectResult = {
    5: subjetGradeCount(students, subjectIndex, 5),
    4: subjetGradeCount(students, subjectIndex, 4),
    3: subjetGradeCount(students, subjectIndex, 3),
    2: subjetGradeCount(students, subjectIndex, 2),
    1: subjetGradeCount(students, subjectIndex, 1),
  }

  return [
    subjectName,
    formatResults(subjectResult[5]),
    formatResults(subjectResult[4]),
    formatResults(subjectResult[3]),
    formatResults(subjectResult[2]),
    formatResults(subjectResult[1]),
    formatResults(students.length - subjectResult[1]),
    subjectAverage(students, subjectIndex),
  ]
}
