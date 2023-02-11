import ListItem from './ListItem'

export default function List() {
  return (
    <ul className="flex flex-row flex-wrap items-start justify-center gap-1 sm:gap-2">
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </ul>
  )
}
