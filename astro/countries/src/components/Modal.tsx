import { useState } from 'react'
import type { CountryT } from '../data/bosna'

type ModalProps = {
  isShow: boolean
  setHidden: () => void
  country?: CountryT
  getCountry: (cca3: string) => void
}

export default function Modal({
  isShow,
  setHidden,
  country,
  getCountry,
}: ModalProps) {
  if (!isShow || country === undefined) return null

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-slate-500">
      <button onClick={setHidden}>X</button>
      <p>{country.name.official}</p>
      <p>Susjedne države:</p>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {country.borders.map((border) => (
          <button
            key={border}
            className="btn btn-primary"
            onClick={() => getCountry(border)}
          >
            {border}
          </button>
        ))}
      </div>
    </div>
  )
}
