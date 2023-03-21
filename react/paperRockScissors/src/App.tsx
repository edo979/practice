import Compare from './components/Compare'
import PickButton from './components/PickButton'
import { useGameData } from './hooks/GameHook'

function App() {
  // const [state, setState] = useState<StateT>({ showHousePick: false })
  let gameWindow: React.ReactNode | undefined = undefined
  const { userPick, housePick, handleUserPick, showHousePick } = useGameData()

  // function handleUserPick(value: ButtonT) {
  //   setState((prev) => ({ ...prev, userPick: value, showHousePick: true }))
  // }

  // useEffect(() => {
  //   if (state.userPick === undefined) return

  //   setTimeout(() => {
  //     setState((prev) => ({ ...prev, housePick: 'rock' }))
  //   }, 1000)
  // }, [state])

  if (showHousePick) {
    gameWindow = <Compare userPick={userPick!} housePick={housePick} />
  } else {
    gameWindow = <PickButton handleUserPick={handleUserPick} />
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
