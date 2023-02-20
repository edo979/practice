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
    <div className="fixed top-0 left-0 h-full w-full p-6 grid grid-cols-[minmax(320px,_576px)] place-content-center bg-black/70">
      <div className="p-4 border border-stone-600 rounded bg-stone-800">
        <button
          onClick={setHidden}
          className="block py-1 px-3 ml-auto rounded-md border border-stone-500 bg-stone-600 text-stone-300 font-light"
        >
          X
        </button>

        <div className="flex flex-col gap-4">
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="mt-4 rounded"
          />
          <p className="text-xl font-bold">
            {country.translations.hrv.common || country.name.common}
          </p>

          <p>Susjedne države:</p>
          <div className="flex flex-row flex-wrap gap-2">
            {country.borders ? (
              country.borders.map((cca3) => (
                <button
                  key={cca3}
                  className="btn btn-primary"
                  onClick={() => getCountry(cca3)}
                >
                  {getCountryName(cca3)}
                </button>
              ))
            ) : (
              <p>Nema kopnenih susjednih država.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
