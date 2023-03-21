import { useGameData } from '../hooks/GameHook'
import Button from './Button'

export default function Compare() {
  const { userPick, housePick } = useGameData()

  if (!userPick) {
    return null
  }

  return (
    <div className="relative w-72 mx-auto mt-8">
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
    </div>
  )
}
