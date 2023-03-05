import { subjects as subjectsData } from './subjects'

type StoreT = {
  className?: string
  subjects?: string[]
  students?: string[]
}

const LSKEY = 'grade-calculator-ao79'

export const getSubjects = (className: string): string[] | undefined => {
  return subjectsData.hed[className] ?? undefined
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
