import { useState } from 'react'
import { GeolocationT, useWeatherContex } from '../hooks/WeatherContext'

type ModalProps = {
  isShow: boolean
  setIsShow: (show: boolean) => void
}

export default function Modal({ isShow, setIsShow }: ModalProps) {
  const [city, setCity] = useState('')
  const [data, setData] = useState<GeolocationT[] | undefined>(undefined)
  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState(false)
  const { setGeolocationData } = useWeatherContex()

  async function handleForm() {
    setIsPending(true)

    try {
      const res = await fetch('api/geolocation', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      })

      if (res.ok) {
        const data = (await res.json()) as GeolocationT[]
        isError && setIsError(false)
        setData(data)
        setCity('')
      }
    } catch {
      setIsError(true)
    }

    setIsPending(false)
  }

  function handleClose() {
    setCity('')
    setData(undefined)
    setIsShow(false)
  }

  function handleChangeGeolocation(city: GeolocationT) {
    setGeolocationData(city)
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
              className={`inline-block rounded border py-1 px-3 transition  ${
                isPending
                  ? 'border-yellow-400 bg-yellow-300'
                  : 'border-yellow-600 bg-yellow-400 shadow-md'
              }`}
              disabled={isPending}
            >
              {isPending ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              )}
            </button>
          </div>
        </form>

        {data && (
          <ul className="mt-4">
            {data.map((city, i) => (
              <li
                key={i}
                className="flex flex-row items-center justify-between gap-2 py-1 px-2 odd:bg-slate-200 hover:bg-blue-200"
                onClick={() => handleChangeGeolocation(city)}
              >
                <p>{city.name}</p>
                <p>{city.country}</p>
              </li>
            ))}
          </ul>
        )}

        {isError && (
          <div className="mt-4 rounded border border-rose-400 bg-rose-200 p-4 text-center text-rose-500">
            <p className="text-xl font-bold">❌ Došlo je do greške</p>
            <p className="text-md">Pokušajte ponovo!</p>
          </div>
        )}
      </div>
    </div>
  )
}
