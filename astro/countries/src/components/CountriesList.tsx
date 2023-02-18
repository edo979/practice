export default function CountriesList({ countries }: { countries: any }) {
  return (
    <ul className="mt-8">
      {countries.map((country: any) => (
        <li key={country.cca2}>
          {country.name.common}, {country.name.official}, {country.cca2},{' '}
          {country.cca3}
        </li>
      ))}
    </ul>
  )
}
