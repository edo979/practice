import { useEffect, useState } from 'react'

type ModalProps = {
  isShow: boolean
  setIsShow: (show: boolean) => void
}

type GeolocationT = {
  lat: string
  lon: string
  country: string
  name: string
}

export default function Modal({ isShow, setIsShow }: ModalProps) {
  const [city, setCity] = useState('')
  const [data, setData] = useState<GeolocationT[] | undefined>(undefined)

  async function handleForm() {
    const res = await fetch('api/geolocation', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city }),
    })

    if (res.ok) {
      const data = (await res.json()) as GeolocationT[]
      setData(data)
      setCity('')
    }
  }

  function handleClose() {
    setCity('')
    setData(undefined)
    setIsShow(false)
  }

  return (
    <div
      className={`absolute top-0 left-0 z-30 grid h-screen w-full place-content-center ${
        isShow ? '' : ' hidden'
      }`}
    >
      <div className="relative min-w-[370px] rounded-md border border-blue-300 bg-blue-50 py-8 px-4 shadow-lg">
        <span
          className="absolute top-1 right-1 block cursor-pointer rounded border border-rose-500 py-0.5 px-2 text-lg font-bold text-rose-600 hover:bg-rose-600 hover:text-rose-50"
          onClick={handleClose}
        >
          X
        </span>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleForm()
          }}
        >
          <label
            htmlFor="city"
            className="block w-full text-lg font-bold text-blue-800"
          >
            Vremenska prognoza za grad:
          </label>

          <div className="mt-4 flex flex-row items-stretch gap-1">
            <input
              className="inline-block w-full rounded border border-blue-700 bg-blue-50 py-1 px-2 text-lg text-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
              type="text"
              name="city"
              id="city"
              placeholder="Ime grada..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="inline-block rounded border border-yellow-600 bg-yellow-400 py-1 px-3 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </form>

        {data && (
          <ul className="mt-4">
            {data.map((city, i) => (
              <li
                key={i}
                className="flex flex-row items-center justify-between gap-2 py-1 px-2 odd:bg-slate-200 hover:bg-blue-200"
              >
                <p>{city.name}</p>
                <p>{city.country}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
