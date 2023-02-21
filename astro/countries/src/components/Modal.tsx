import { useState } from 'react'
import type { CountryT } from '../data/bosna'
import { regions } from './ListItem'

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
    <div className="fixed top-0 left-0 h-full w-full p-6 grid grid-cols-[minmax(320px,_840px)] place-content-center bg-black/70 sm:bg-black/90">
      <div className="p-4 border border-stone-600 rounded bg-stone-800 overflow-y-auto lg:px-8">
        <button
          onClick={setHidden}
          className="block py-1 px-3 ml-auto rounded-md border border-stone-500 bg-stone-600 text-sm text-stone-300 font-light"
        >
          X
        </button>

        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
          <div className="space-y-2 sm:basis-56 md:basis-60 lg:basis-80">
            <img
              src={country.flags.png}
              alt={country.name.common}
              className="rounded"
            />

            <p className="text-lg font-bold md:text-2xl lg:text-3xl">
              {country.translations.hrv.common || country.name.common}
            </p>

            <div>
              <p className="text-xs text-stone-500 tracking-tighter uppercase font-semibold">
                Glavni grad:
              </p>
              <p className="text-lg md:text-2xl">{country.capital}</p>
            </div>

            <div>
              <p className="text-xs text-stone-500 tracking-tighter uppercase font-semibold">
                Broj stanovnika:
              </p>
              <p className="text-lg md:text-2xl">
                {country.population.toLocaleString('hr-BA')}
              </p>
            </div>
          </div>

          <div className="space-y-2 sm:basis-full">
            <div>
              <p className="text-xs text-stone-500 tracking-tighter uppercase font-semibold md:text-lg">
                Susjedne države:
              </p>
              <div className="mt-2 flex flex-row flex-wrap gap-2">
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
                  <p className="md:text-lg">Nema kopnenih susjednih država.</p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xs text-stone-500 tracking-tighter uppercase font-semibold">
                Kontinet:
              </p>
              <p className="text-lg md:text-2xl">
                {regions[`${country.region}`]}
              </p>
            </div>

            <div>
              <p className="text-xs text-stone-500 tracking-tighter uppercase font-semibold">
                Površina države:
              </p>
              <p className="text-lg md:text-2xl">
                {(country.area / 1000).toLocaleString('hr-BA')} km<sup>2</sup>
              </p>
            </div>

            <div>
              <p className="text-xs text-stone-500 tracking-tighter uppercase font-semibold">
                Zvanični jezici:
              </p>
              <p className="text-lg md:text-2xl">
                {Object.keys(country.languages).join(' ,')}
              </p>
            </div>

            <div>
              <p className="text-xs text-stone-500 tracking-tighter uppercase font-semibold">
                Skraćenice za državu:
              </p>
              <p className="text-lg md:text-2xl">
                <span>{country.cca2}</span>, <span>{country.cca3}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
