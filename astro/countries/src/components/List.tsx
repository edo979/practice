import ListItem from './ListItem'

export default function List({ countries }: { countries: any }) {
  return (
    <ul className="mt-8">
      {countries.map((country: any) => (
        <li key={country.cca2}>
          <ListItem country={country} />
        </li>
      ))}
    </ul>
  )
}
