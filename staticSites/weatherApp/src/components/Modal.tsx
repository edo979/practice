import { useEffect, useState } from 'react'

type ModalProps = {
  isShow: boolean
  setIsShow: (show: boolean) => void
}

export default function Modal({ isShow, setIsShow }: ModalProps) {
  const [city, setCity] = useState('')

  async function handleForm() {
    const res = await fetch('api/geolocation', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city }),
    })

    if (res.ok) {
      const data = (await res.json()) as {
        lat: string
        lon: string
        country: string
        name: string
      }
      console.log(data)
    }
  }

  return (
    <div
      className={`absolute top-0 left-0 grid h-screen w-full place-content-center ${
        isShow ? '' : ' hidden'
      }`}
    >
      <div className="relative min-w-[370px] rounded-md border border-blue-300 bg-blue-50 py-8 px-4 shadow-lg">
        <span
          className="absolute top-1 right-1 block cursor-pointer rounded border border-rose-500 py-0.5 px-2 text-lg font-bold text-rose-600 hover:bg-rose-600 hover:text-rose-50"
          onClick={() => setIsShow(false)}
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
              className="inline-block rounded border border-yellow-600 bg-yellow-400 py-1 px-3"
            >
              Get
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
