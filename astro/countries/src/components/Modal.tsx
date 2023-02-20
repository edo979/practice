import { useState } from 'react'
import type { CountryT } from '../data/bosna'

type ModalProps = {
  isShow: boolean
  setHidden: () => void
  country?: CountryT
}

export default function Modal({ isShow, setHidden, country }: ModalProps) {
  if (!isShow || country === undefined) return null

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-slate-500">
      <button onClick={setHidden}>X</button>
      <p>{country.name.official}</p>
    </div>
  )
}
