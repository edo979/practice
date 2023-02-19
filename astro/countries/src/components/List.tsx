import ListItem from './ListItem'

export default function List({ countries }: { countries: any }) {
  return (
    <ul className="mt-8 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] auto-rows-fr gap-4">
      {countries.map((country: any) => (
        <ListItem key={country.cca2} country={country} />
      ))}
    </ul>
  )
}
