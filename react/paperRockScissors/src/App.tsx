import { useState } from 'react'
import Compare from './components/Compare'
import PickButton from './components/PickButton'
import { useGameData } from './hooks/GameHook'

function App() {
  let gameWindow: React.ReactNode | undefined = undefined
  const [showModal, setShowModal] = useState(false)
  const { showResults } = useGameData()

  if (showResults) {
    gameWindow = <Compare />
  } else {
    gameWindow = <PickButton />
  }

  return (
    <>
      <div className="max-w-xs mx-auto pt-8">
        <section className="p-4 border-2 border-neutralBlue50 rounded-md">
          <h1 className=" text-xl text-white font-bold uppercase text-center">
            Papir - kamen - makaze
          </h1>
        </section>

        <section className="min-h-[400px]">{gameWindow}</section>

        <section className="mt-6 flex justify-center ">
          <button
            className="uppercase py-2 px-4 rounded-md border-2 border-neutralBlue50 bg-transparent text-neutralBlue50 hover:border-slate-50 hover:text-slate-50"
            onClick={() => setShowModal(true)}
          >
            Pravila
          </button>
        </section>
      </div>

      {showModal && (
        <section className="absolute inset-0 p-8 flex items-center justify-center bg-slate-900/80">
          <div className="w-full p-4 pb-8 max-w-xs rounded-md bg-slate-50">
            <div className="mr-2 mt-2 mb-8 flex justify-end">
              <button onClick={() => setShowModal(false)}>
                <svg
                  width="20"
                  height="20"
                  className="fill-stone-400 hover:fill-rose-600"
                >
                  <use xlinkHref="#close-btn"></use>
                </svg>
              </button>
            </div>

            <img src="images/image-rules.svg" alt="" />
          </div>
        </section>
      )}
    </>
  )
}

export default App
