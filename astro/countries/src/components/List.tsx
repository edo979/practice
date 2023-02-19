import ListItem from './ListItem'

export default function List({ countries }: { countries: any }) {
  return (
    <ul className="mt-8">
      {countries.map((country: any) => (
        <ListItem key={country.cca2} country={country} />
      ))}
    </ul>
  )
}
