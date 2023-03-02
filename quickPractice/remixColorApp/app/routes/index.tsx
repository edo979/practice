import { Link } from '@remix-run/react'
import { colors } from '../data/colors'

export default function Index() {
  return (
    <main>
      <h1>Colors</h1>
      <ul>
        {colors.map((color) => (
          <li key={color.name}>
            <Link to={color.name.toLowerCase()}>{color.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
