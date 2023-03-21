import Compare from './components/Compare'
import PickButton from './components/PickButton'
import { useGameData } from './hooks/GameHook'

function App() {
  let gameWindow: React.ReactNode | undefined = undefined
  const { showResults } = useGameData()

  if (showResults) {
    gameWindow = <Compare />
  } else {
    gameWindow = <PickButton />
  }

  return (
    <div className="max-w-xs mx-auto">
      <section className="p-4 mt-8 border-2 border-neutralBlue50 rounded-md">
        <h1 className=" text-3xl text-white font-bold">Hello World</h1>
      </section>

      {gameWindow}
    </div>
  )
}

export default App
