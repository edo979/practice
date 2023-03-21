import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type ButtonT = 'scissors' | 'paper' | 'rock'

type GameStateT = {
  userPick?: ButtonT
  housePick?: ButtonT
  showHousePick: boolean
}

type GameContextT = GameStateT & {
  handleUserPick: (value: ButtonT) => void
}

const GameContext = createContext({} as GameContextT)

export function useGameData() {
  return useContext(GameContext)
}

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameStateT>({ showHousePick: false })

  function handleUserPick(value: ButtonT) {
    setState((prev) => ({ ...prev, userPick: value, showHousePick: true }))
    handleHousePick()
  }

  async function handleHousePick() {
    await new Promise(() => {
      setTimeout(() => {
        setState((prev) => ({ ...prev, housePick: 'rock' }))
      }, 1000)
    })

    setState((prev) => ({ ...prev, housePick: 'rock' }))
  }

  return (
    <GameContext.Provider
      value={{
        userPick: state.userPick,
        housePick: state.housePick,
        handleUserPick,
        showHousePick: state.showHousePick,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
