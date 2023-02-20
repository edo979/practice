import { useState } from 'react'
import { countryData, CountryT } from '../data/bosna'
import ListItem from './ListItem'
import Modal from './Modal'

type StateT = {
  country?: CountryT
  isShowDetails: boolean
}

export default function List({
  countries,
  getCountry,
}: {
  countries: CountryT[]
  getCountry: (cca3: string) => CountryT | undefined
}) {
  const [state, setState] = useState<StateT>({
    isShowDetails: true,
    country: countryData,
  })

  function setDetailsHidden() {
    setState((prev) => ({ ...prev, isShowDetails: false }))
  }

  function showDetails(country: CountryT) {
    setState({ country, isShowDetails: true })
  }

  function changeCountry(cca3: string) {
    const country = getCountry(cca3)
    setState((prev) => ({ ...prev, country: country }))
  }

  return (
    <>
      <ul className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(250px,_1fr))] auto-rows-auto gap-4">
        {countries.map((country: any) => (
          <ListItem
            key={country.cca2}
            country={country}
            showDetails={showDetails}
          />
        ))}
      </ul>

      <Modal
        isShow={state.isShowDetails}
        setHidden={setDetailsHidden}
        country={state.country}
        getCountry={changeCountry}
      />
    </>
  )
}
