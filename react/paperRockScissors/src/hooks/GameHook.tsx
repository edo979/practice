import { createContext, ReactNode, useContext, useState } from 'react'

export type ButtonT = 'scissors' | 'paper' | 'rock'

type GameStateT = {
  userPick?: ButtonT
  housePick?: ButtonT
  showResults: boolean
}

type GameContextT = GameStateT & {
  handleUserPick: (value: ButtonT) => void
  getWiner: () => 0 | 1 | 2
  resetGame: () => void
}

const GameContext = createContext({} as GameContextT)

export function useGameData() {
  return useContext(GameContext)
}

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameStateT>({ showResults: false })

  function handleUserPick(value: ButtonT) {
    setState((prev) => ({ ...prev, userPick: value, showResults: true }))
    handleHousePick()
  }

  async function handleHousePick() {
    await new Promise((r) => setTimeout(r, 1000))
    setState((prev) => ({ ...prev, housePick: 'rock' }))
  }

  function getWiner() {
    if (state.userPick === state.housePick) return 0
    if (state.userPick === 'paper' && state.housePick === 'rock') return 1
    if (state.userPick === 'scissors' && state.housePick === 'paper') return 1
    if (state.userPick === 'rock' && state.housePick === 'scissors') return 1

    return 2
  }

  function resetGame() {
    setState({
      housePick: undefined,
      userPick: undefined,
      showResults: false,
    })
  }

  return (
    <GameContext.Provider
      value={{
        userPick: state.userPick,
        housePick: state.housePick,
        handleUserPick,
        showResults: state.showResults,
        getWiner,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
