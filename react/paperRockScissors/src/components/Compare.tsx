import { useEffect, useState } from 'react'
import { useGameData } from '../hooks/GameHook'
import Button from './Button'
import GradientBackground from './GradientBackground'

export default function Compare() {
  const { userPick, housePick, getWiner, resetGame } = useGameData()
  if (!userPick) return null
  const [winer, setWiner] = useState<0 | 1 | 2>()

  useEffect(() => {
    if (!housePick) return

    setWiner(getWiner())
  }, [housePick])

  return (
    <div>
      <section className="relative w-72 mx-auto mt-8">
        <div className="flex justify-between gap-8">
          <div className="basis-1/2 flex flex-col items-center">
            <Button buttonType={userPick} />
            <p className="mt-4 text-slate-50 uppercase">Vaš izbor</p>
          </div>

          <div className="basis-1/2 flex flex-col items-center justify-between">
            {housePick ? (
              <Button buttonType={housePick} />
            ) : (
              <div className="w-24 h-24 my-auto rounded-full bg-slate-900"></div>
            )}
            <p className="mt-4 text-slate-50 uppercase">Izbor Aplikacije</p>
          </div>
        </div>
      </section>

      <GradientBackground />

      {winer !== undefined && (
        <section className="mt-12 flex flex-col items-center">
          <p className="text-5xl uppercase text-slate-50">
            {winer ? (winer === 1 ? 'Pobjeda' : 'Poraz') : 'Nerješeno'}
          </p>
          <button
            className="mt-5 py-4 px-14 rounded-md text-neutralDark uppercase tracking-widest bg-slate-50 hover:text-rose-600"
            onClick={resetGame}
          >
            Igraj ponovo
          </button>
        </section>
      )}
    </div>
  )
}
