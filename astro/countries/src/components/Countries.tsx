import CountriesList from './CountriesList'
import SeacrhBar from './SeacrhBar'
import { useState } from 'react'
import {
  filterCountriesByName,
  filterCountriesByRegion,
} from '../utility/FiltersFunctions'

import { data } from '../data/data'
import { countryData } from '../data/bosna'

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

  const filterByRegion = (region: string) => {
    if (region === 'All') {
      setState((prev: any) => ({ ...prev, countriesFilteredByRegion: [] }))
    } else {
      const countries = filterCountriesByRegion(state.countries, region)
      setState((prev: any) => ({
        ...prev,
        countriesFilteredByRegion: countries,
      }))
    }
  }

  //console.log(new Set(data.map((c) => c.region)))
  console.log(state.countriesFilteredByRegion.map((c: any) => c.name))

  return (
    <main>
      <SeacrhBar findByName={filterByName} filterByRegion={filterByRegion} />
      <CountriesList countries={state.countriesFilteredByName} />
    </main>
  )
}
