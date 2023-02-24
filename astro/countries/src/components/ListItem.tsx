import type { CountryT } from '../data/bosna'

type ListItemProps = {
  country: CountryT
  showDetails: (country: CountryT) => void
}

export const regions: { [key: string]: string } = {
  Asia: 'Azija',
  Africa: 'Afrika',
  Americas: 'Amerika',
  Antarctic: 'Antarktika',
  Europe: 'Evropa',
  Oceania: 'Australija',
}

export default function ListItem({ country, showDetails }: ListItemProps) {
  return (
    <li
      className="p-4 sm:max-w-sm border flex flex-col gap-4 border-stone-600 rounded-md bg-stone-800 shadow-md 
    shadow-zinc-900 cursor-pointer hover:border-stone-400 hover:shadow-zinc-600 hover:shadow-lg"
      onClick={() => showDetails(country)}
    >
      <div className="h-48 flex">
        <img
          src={country.flags.png}
          alt={country.name.official}
          className="rounded h-full w-full object-cover"
        />
      </div>

      <table className="text-lg self-center">
        <tbody>
          <tr>
            <td className="text-md text-right font-light tracking-tight text-stone-400">
              Ime:
            </td>
            <td className="pl-2 font-semibold md:text-2xl">
              {country.translations?.hrv?.common ?? country.name.common}
            </td>
          </tr>

          <tr>
            <td className="text-md text-right font-light tracking-tight text-stone-400">
              Glavni grad:
            </td>
            <td className="pl-2 font-semibold">{country.capital}</td>
          </tr>

          <tr>
            <td className="text-md text-right font-light tracking-tight text-stone-400">
              Stanovnika:
            </td>
            <td className="pl-2 font-semibold">
              {country.population.toLocaleString('hr-BA')}
            </td>
          </tr>

          <tr>
            <td className="text-md text-right font-light tracking-tight text-stone-400">
              Površina:
            </td>
            <td className="pl-2 font-semibold">
              {country.area.toLocaleString('hr-BA')} km<sup>2</sup>
            </td>
          </tr>

          <tr>
            <td className="text-md text-right font-light tracking-tight text-stone-400">
              Kontinent:
            </td>
            <td className="pl-2 font-semibold">
              {regions[`${country.region}`]}
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  )
}
