import type { CountryT } from '../data/bosna'

const regions: { [key: string]: string } = {
  Asia: 'Azija',
  Africa: 'Afrika',
  Americas: 'Amerika',
  Antarctic: 'Antarktika',
  Europe: 'Evropa',
  Oceania: 'Australija',
}

export default function ListItem({ country }: { country: CountryT }) {
  return (
    <li className="p-4 border flex flex-col gap-4 border-stone-600 rounded-md bg-stone-800 shadow-md shadow-zinc-900">
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
            <td className="pl-2 font-semibold">
              {country.translations?.hrv?.official ?? country.name.official}
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
              {(country.area / 1000).toLocaleString('hr-BA')} km<sup>2</sup>
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
