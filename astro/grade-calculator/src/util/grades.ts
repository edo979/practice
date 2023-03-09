export const getStudentAverage = (grades: number[]) => {
  const gradesSum = gradeSum(grades)

  if (gradesSum === 1) return 1

  return Math.round((gradesSum / grades.length) * 100) / 100
}

const gradeSum = (grades: number[]) => {
  if (grades.some((grade) => grade === 1)) return 1
  return grades.reduce((acc, curr) => acc + curr, 0)
}
