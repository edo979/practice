export const getStudentAverageShow = (grades: number[]) => {
  const averageFloat = gradeSum(grades) / grades.length
  return Math.round(averageFloat * 100) / 100
}
export const getStudentAverage = (grades: number[]) => {
  return (gradeSum(grades) / grades.length).toFixed(2)
}

const gradeSum = (grades: number[]) =>
  grades.reduce((acc, curr) => acc + curr, 0)
