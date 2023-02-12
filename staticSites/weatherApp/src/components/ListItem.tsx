type ListItemProps = {
  day: string
  temp: number
  icon: number
}

export default function ListItem({ day, temp, icon }: ListItemProps) {
  return (
    <li className="flex h-max flex-col items-center gap-1 rounded-md border border-blue-50 border-opacity-20 bg-blue-200 bg-opacity-20 shadow-md">
      <p className="capitalize text-blue-50">{day === 'sre' ? 'sri' : day}</p>
      <img src="assets/sun.png" alt="" className="w-16" />
      <p className="text-blue-50">{Math.round(temp)} °C</p>
    </li>
  )
}
