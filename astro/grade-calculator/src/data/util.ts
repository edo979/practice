import { subjects as subjectsData } from './subjects'

export type StudentsT = {
  id: number
  lastName: string
  firstName: string
  grades?: number[]
}

type StoreT = {
  classNumber?: string
  subjects?: string[]
  students?: StudentsT[]
}

export const LSKEY = 'grade-calculator-ao79'

export const getSubjects = (classNumber: string): string[] | undefined => {
  return subjectsData.hed[classNumber] ?? undefined
}

export const getNextStudentID = () => {
  const LS = localStorage.getItem(LSKEY)
  if (LS) {
    const students = (JSON.parse(LS) as StoreT).students
    return students ? students.length + 1 : 1
  }

  return 1
}

export const getStudentsFromLS = () => {
  const LS = localStorage.getItem(LSKEY)
  if (LS) return (JSON.parse(LS) as StoreT).students || []
  return []
}

// -- LS --

export const saveToLS = (dataToSave: StoreT) => {
  const rawData = localStorage.getItem(LSKEY)

  if (rawData) {
    const data = JSON.parse(rawData)
    localStorage.setItem(LSKEY, JSON.stringify({ ...data, ...dataToSave }))
  } else {
    localStorage.setItem(LSKEY, JSON.stringify({ ...dataToSave }))
  }
}
