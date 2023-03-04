import { useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { subjects } from '../../data/subjects'

type AppStateT = {
  classNumber?: string
  subjects?: string[]
  students?: string[]
}

type ContextType = {
  appState: AppStateT
  setClassNumber: (classNumber: string) => void
}

export default function IndexRoute() {
  const [appState, setAppState] = useState<AppStateT>({})

  const setClassNumber = (classNumber: string) => {
    if (classNumber === '0') {
      setAppState((prev) => ({
        ...prev,
        subjects: undefined,
        classNumber: undefined,
      }))
    } else {
      setAppState((prev) => ({
        ...prev,
        subjects: subjects.hed[classNumber] ?? [],
        classNumber: classNumber,
      }))
    }
  }

  return <Outlet context={{ appState, setClassNumber }} />
}

export function useAppStore() {
  return useOutletContext<ContextType>()
}
