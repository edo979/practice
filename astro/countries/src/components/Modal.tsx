import { useState } from 'react'
import type { CountryT } from '../data/bosna'

type ModalProps = {
  isShow: boolean
  setHidden: () => void
  country?: CountryT
  getCountry: (cca3: string) => void
  getCountryName: (cca3: string) => string
}

export default function Modal({
  isShow,
  setHidden,
  country,
  getCountry,
  getCountryName,
}: ModalProps) {
  if (!isShow || country === undefined) return null

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-slate-500">
      <button onClick={setHidden}>X</button>
      <p>{country.name.official}</p>
      <p>Susjedne države:</p>
      <div className="flex flex-row flex-wrap gap-2">
        {country.borders.map((cca3) => (
          <button
            key={cca3}
            className="btn btn-primary"
            onClick={() => getCountry(cca3)}
          >
            {getCountryName(cca3)}
          </button>
        ))}
      </div>
    </div>
  )
}
