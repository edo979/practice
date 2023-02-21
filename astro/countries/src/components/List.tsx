import { useState } from 'react'
import type { CountryT } from '../data/bosna'
import ListItem from './ListItem'
import Modal from './Modal'

type StateT = {
  country?: CountryT
  isShowDetails: boolean
}

export default function List({
  countries,
  getCountry,
  getCountryName,
}: {
  countries: CountryT[]
  getCountry: (cca3: string) => CountryT | undefined
  getCountryName: (cca3: string) => string
}) {
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

  function changeCountry(cca3: string) {
    const country = getCountry(cca3)
    setState((prev) => ({ ...prev, country: country }))
  }

  if (countries.length === 0)
    return (
      <div className="mt-8">
        <p className="text-lg font-bold">Uputstvo:</p>
        <ul className="list-disc ml-8">
          <li className="list-item">
            Ostavite prazno polje za ime države ako želte vidjeti sve države sa
            odabranog kontinenta.
          </li>
          <li>
            Upišite ime države i odaberite kontinent ako želite precizniju
            pretragu.
          </li>
          <li>
            <b>ili samo upišite nekoliko početnih slova države</b>
          </li>
          <li>kliknite na polje države da bi vidjeli detalje</li>
        </ul>
      </div>
    )

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
        getCountryName={getCountryName}
      />
    </>
  )
}
