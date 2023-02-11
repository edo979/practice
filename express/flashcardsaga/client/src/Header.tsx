import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="header">
      <div className="flex">
        <Link to="/">LOGO</Link>
        <Link to="/">Decks</Link>
        <span>login</span>
      </div>
    </div>
  )
}
