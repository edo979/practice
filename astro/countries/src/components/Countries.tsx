import CountriesList from './CountriesList'
import SeacrhBar from './SeacrhBar'
import { data } from '../data/data'

export default function Countries() {
  return (
    <main>
      <SeacrhBar />
      <CountriesList />
    </main>
  )
}
