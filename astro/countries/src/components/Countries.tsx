import List from './List'
import SeacrhBar from './SeacrhBar'
import { useEffect, useState } from 'react'
import {
  filterCountriesByName,
  filterCountriesByRegion,
} from '../utility/FiltersFunctions'

import { data } from '../data/data'
import { getData } from '../model/api'

export default function Countries() {
  const [state, setState] = useState<any>({
    countries: undefined,
    filteredCountries: [],
  })

  const filterCountries = (name: string, region: string) => {
    const regionCountries = filterCountriesByRegion(state.countries, region)
    const countries = filterCountriesByName(regionCountries, name)

    setState((prev: any) => ({ ...prev, filteredCountries: countries }))
  }

  function getCountry(cca3: string) {
    return state.countries.find((country: any) => country.cca3 === cca3)
  }

  function getCountryName(cca3: string) {
    const country = state.countries.find(
      (country: any) => country.cca3 === cca3
    )

    if (!country) return cca3

    const name: string = country.translations.hrv.common || country.name

    return name
  }

  useEffect(() => {
    let ignore = false

    async function loadData() {
      if (ignore) return

      const data = await getData()
      if (!data) window.location.href = '/404'

      setState((prev: any) => ({ ...prev, countries: data }))
    }

    loadData()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <SeacrhBar search={filterCountries} />
      <List
        countries={state.filteredCountries}
        getCountry={getCountry}
        getCountryName={getCountryName}
      />
    </>
  )
}
