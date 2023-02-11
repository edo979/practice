export default function ListItem() {
  return (
    <li className="flex h-max flex-col items-center gap-1 rounded-md border border-blue-50 border-opacity-20 bg-blue-200 bg-opacity-20 shadow-md">
      <p>Pon</p>
      <img src="assets/sun.png" alt="" className="w-16" />
      <p>20 °C</p>
    </li>
  )
}
