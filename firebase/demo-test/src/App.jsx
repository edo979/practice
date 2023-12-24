import { useEffect, useState } from 'react'
import './App.css'
import { getContacts } from './db/db'

function App() {
  useEffect(() => {
    const getCon = async () => {
      console.log(await getContacts())
    }
    getCon()
  }, [])

  return <>jah</>
}

export default App
