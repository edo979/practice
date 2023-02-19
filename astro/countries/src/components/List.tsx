import ListItem from './ListItem'

export default function List({ countries }: { countries: any }) {
  return (
    <ul className="mt-8 flex flex-row flex-wrap gap-2 w-full justify-center border border-rose-500">
      {countries.map((country: any) => (
        <ListItem key={country.cca2} country={country} />
      ))}
    </ul>
  )
}
