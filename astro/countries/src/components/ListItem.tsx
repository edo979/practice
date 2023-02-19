export default function ListItem({ country }: { country: any }) {
  return (
    <div>
      {country.name.common}, {country.name.official}, {country.cca2},{' '}
      {country.cca3}
    </div>
  )
}
