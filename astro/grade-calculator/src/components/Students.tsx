export default function Students() {
  const handleStudentsData = () => {
    console.log('name')
  }

  return (
    <form
      className="max-w-sm"
      onSubmit={(e) => {
        e.preventDefault()
        handleStudentsData()
      }}
    >
      <label htmlFor="firstName" className="block">
        Ime:
      </label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        className="w-full border"
      />

      <label htmlFor="lastName" className="block">
        Prezime:
      </label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        className="w-full border"
      />

      <button type="submit" className="btn">
        Naredni učenik
      </button>
      <button type="button" className="btn">
        Dalje
      </button>
    </form>
  )
}
