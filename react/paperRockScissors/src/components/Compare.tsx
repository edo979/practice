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
    <div className="mt-8 grid grid-rows-[auto_auto] grid-cols-2 sm:grid-rows-1 sm:grid-cols-3">
      <div className="justify-self-start flex flex-col items-center">
        <div className="relative">
          {winer === 1 && <GradientBackground />}
          <Button buttonType={userPick} />
        </div>
        <p className="mt-4 text-slate-50 uppercase">Vaš izbor</p>
      </div>

      <div className="justify-self-end flex flex-col items-center justify-between sm:col-start-3">
        {housePick ? (
          <div className="relative">
            {winer === 2 && <GradientBackground />}
            <Button buttonType={housePick} />
          </div>
        ) : (
          <div className="w-24 h-24 my-auto rounded-full bg-slate-900"></div>
        )}
        <p className="mt-4 text-slate-50 uppercase">Izbor Aplikacije</p>
      </div>

      {winer !== undefined && (
        <section className="mt-12 place-self-center col-span-2 flex flex-col items-center sm:mt-0 sm:col-start-2 sm:col-span-1 sm:row-start-1">
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
