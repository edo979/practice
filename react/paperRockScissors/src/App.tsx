import classNames from 'classnames'
import { useEffect, useState } from 'react'
import GameButton from './components/GameButton'

type StateT = {
  userPick?: string
  housePick?: string
}

function App() {
  const [state, setState] = useState<StateT>({})

  function handleUserPick(value: string) {
    setState((prev) => ({ ...prev, userPick: value }))
  }

  useEffect(() => {
    if (state.userPick === undefined || state.housePick !== undefined) return

    setTimeout(() => {
      setState((prev) => ({ ...prev, housePick: 'rock' }))
    }, 1000)
  }, [state])

  return (
    <div className="max-w-xs mx-auto">
      <section className="p-4 mt-8 border-2 border-neutralBlue50 rounded-md">
        <h1 className=" text-3xl text-white font-bold">Hello World</h1>
      </section>

      <section className="mt-8 h-72 w-72 mx-auto relative">
        <div
          className={classNames('absolute top-0 left-0 isolate', {
            hidden: state.userPick && state.userPick !== 'paper',
          })}
        >
          <GameButton buttonType="paper" handleUserPick={handleUserPick} />
        </div>

        <div
          className={classNames('absolute top-0 isolate', {
            'right-0': state.userPick !== 'scissors',
            'right-[unset] left-0': state.userPick === 'scissors',
            hidden: state.userPick && state.userPick !== 'scissors',
          })}
        >
          <GameButton buttonType="scissors" handleUserPick={handleUserPick} />
        </div>

        <div
          className={classNames('absolute bottom-0 isolate', {
            'left-20': state.userPick === undefined,
            'bottom-[unset] top-0 left-0': state.userPick === 'rock',
            hidden: state.userPick && state.userPick !== 'rock',
          })}
        >
          <GameButton buttonType="rock" handleUserPick={handleUserPick} />
        </div>

        <div
          className={classNames(
            'w-full h-full flex items-center justify-center',
            { hidden: state.userPick !== undefined }
          )}
        >
          <svg className="w-[70%]" viewBox="0 0 313 278">
            <use xlinkHref="#triangle"></use>
          </svg>
        </div>
      </section>
    </div>
  )
}

export default App
