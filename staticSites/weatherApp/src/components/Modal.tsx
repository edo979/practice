import { useState } from 'react'

type ModalProps = {
  isShow: boolean
  setIsShow: (show: boolean) => void
}

export default function Modal({ isShow, setIsShow }: ModalProps) {
  const [city, setCity] = useState('')

  function handleInput(value: string) {
    setCity(value)

    if (value.length > 3) {
      console.log(value)
    }
  }

  return (
    <div
      className={`absolute top-0 left-0 grid h-screen w-full place-content-center ${
        isShow ? '' : ' hidden'
      }`}
    >
      <div className="relative min-w-[350px] rounded-md border border-blue-300 bg-blue-50 py-8 px-4 shadow-lg">
        <span
          className="absolute top-1 right-1 block cursor-pointer rounded border border-rose-300 py-0.5 px-2 text-lg font-bold text-rose-500 hover:border-rose-400"
          onClick={() => setIsShow(false)}
        >
          X
        </span>

        <label
          htmlFor="city"
          className="block w-full text-lg font-bold text-blue-800"
        >
          Vremenska prognoza za grad:
        </label>
        <input
          className="mt-4 block w-full rounded border border-blue-700 bg-blue-50 py-1 px-2 text-lg text-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
          type="text"
          name="city"
          id="city"
          placeholder="Ime grada..."
          value={city}
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
    </div>
  )
}
