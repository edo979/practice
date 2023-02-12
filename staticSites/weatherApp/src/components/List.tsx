import ListItem from './ListItem'

type ListProps = {
  data: { temp: number; weatherCode: number; day: string }[]
}

export default function List({ data }: ListProps) {
  return (
    <ul className="flex flex-row flex-wrap items-start justify-center gap-1 sm:gap-2">
      {data.map((day) => (
        <ListItem
          key={day.day}
          day={day.day}
          temp={day.temp}
          icon={day.weatherCode}
        />
      ))}
    </ul>
  )
}
