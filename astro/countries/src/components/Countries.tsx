import CountriesList from './CountriesList'
import SeacrhBar from './SeacrhBar'
import { useState } from 'react'

import { data } from '../data/data'
import { countryData } from '../data/bosna'
import { filterCountriesByName } from '../utility/FiltersFunctions'

export default function Countries() {
  const [state, setState] = useState<any>({
    countries: data,
    countriesFilteredByName: [],
    countriesFilteredByRegion: [],
  })

  const filterByName = (name: string) => {
    const countries = filterCountriesByName(state.countries, name)
    setState((prev: any) => ({ ...prev, countriesFilteredByName: countries }))
  }

  return (
    <main>
      <SeacrhBar findByName={filterByName} />
      <CountriesList countries={state.countriesFilteredByName} />
    </main>
  )
}
