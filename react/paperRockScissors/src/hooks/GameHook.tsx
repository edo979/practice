import { createContext, ReactNode, useContext, useState } from 'react'

export type ButtonT = 'scissors' | 'paper' | 'rock'

type GameStateT = {
  userPick?: ButtonT
  housePick?: ButtonT
  showHousePick: boolean
  winer?: 0 | 1 | 2
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
    await new Promise((r) => setTimeout(r, 1000))
    setState((prev) => ({ ...prev, housePick: 'rock' }))
    setGameWiner()
  }

  function setGameWiner() {
    setState((prev) => ({
      ...prev,
      winer: winerIs(prev.userPick, prev.housePick),
    }))
  }

  function winerIs(userPick?: ButtonT, housePick?: ButtonT) {
    if (userPick === housePick) return 0
    if (userPick === 'paper' && housePick === 'rock') return 1
    if (userPick === 'scissors' && housePick === 'paper') return 1
    if (userPick === 'rock' && housePick === 'scissors') return 1

    return 2
  }

  return (
    <GameContext.Provider
      value={{
        userPick: state.userPick,
        housePick: state.housePick,
        handleUserPick,
        showHousePick: state.showHousePick,
        winer: state.winer,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
