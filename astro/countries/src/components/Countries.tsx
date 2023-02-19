import List from './List'
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
    filteredCountries: [],
  })

  const filterCountries = (name: string, region: string) => {
    const regionCountries = filterCountriesByRegion(state.countries, region)
    const countries = filterCountriesByName(regionCountries, name)

    setState((prev: any) => ({ ...prev, filteredCountries: countries }))
  }

  // console.log(new Set(data.map((c) => c.region)))
  // console.log(state.filteredCountries.map((c: any) => c.name))

  return (
    <main>
      <SeacrhBar search={filterCountries} />
      <List countries={[countryData]} />
    </main>
  )
}