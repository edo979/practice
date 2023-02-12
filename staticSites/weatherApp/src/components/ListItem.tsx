import { getIcon } from '../util/adapters'

type ListItemProps = {
  day: string
  temp: number
  iconCode: number
}

export default function ListItem({ day, temp, iconCode }: ListItemProps) {
  const icon = getIcon(iconCode)

  return (
    <li className="flex h-max flex-col items-center gap-1 rounded-md border border-blue-50 border-opacity-20 bg-blue-200 bg-opacity-20 shadow-md">
      <p className="capitalize text-blue-50">{day === 'sre' ? 'sri' : day}</p>
      <img
        src={`assets/weatherIcon/icons/${icon}.png`}
        alt={icon}
        className="h-16 w-16 object-cover"
      />
      <p className="text-blue-50">{Math.round(temp)} °C</p>
    </li>
  )
}
