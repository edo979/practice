import { useState } from 'react'
import ListItem from './ListItem'
import Modal from './Modal'

export default function List({ countries }: { countries: any }) {
  const [isShowDetails, setIsShowDetails] = useState(false)

  function setDetailsHidden() {
    setIsShowDetails(false)
  }

  function showDetails() {
    setIsShowDetails(true)
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

      <Modal isShow={isShowDetails} setHidden={setDetailsHidden} />
    </>
  )
}
