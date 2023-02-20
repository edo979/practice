import { useState } from 'react'
import type { CountryT } from '../data/bosna'
import ListItem from './ListItem'
import Modal from './Modal'

type StateT = {
  country?: CountryT
  isShowDetails: boolean
}

export default function List({ countries }: { countries: any }) {
  const [state, setState] = useState<StateT>({
    isShowDetails: false,
    country: undefined,
  })

  function setDetailsHidden() {
    setState((prev) => ({ ...prev, isShowDetails: false }))
  }

  function showDetails(country: CountryT) {
    setState({ country, isShowDetails: true })
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
      />
    </>
  )
}
