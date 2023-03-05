import { subjects as subjectsData } from './subjects'

type StudentsT = {
  id: number
  lastName: string
  firstName: string
  grades: number[]
}

type StoreT = {
  classNumber?: string
  subjects?: string[]
  students?: StudentsT[]
}

const LSKEY = 'grade-calculator-ao79'

export const getSubjects = (classNumber: string): string[] | undefined => {
  return subjectsData.hed[classNumber] ?? undefined
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
