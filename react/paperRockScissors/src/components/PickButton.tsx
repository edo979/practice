import { useGameData } from '../hooks/GameHook'
import Button from './Button'

export default function PickButton() {
  const { handleUserPick } = useGameData()

  return (
    <section className="mt-8 h-72 w-72 mx-auto relative">
      <div className="absolute top-0 left-0 isolate">
        <Button buttonType="paper" handleUserPick={handleUserPick} />
      </div>

      <div className="absolute top-0 isolate right-0">
        <Button buttonType="scissors" handleUserPick={handleUserPick} />
      </div>

      <div className="absolute bottom-0 isolate left-20">
        <Button buttonType="rock" handleUserPick={handleUserPick} />
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <svg className="w-[70%]" viewBox="0 0 313 278">
          <use xlinkHref="#triangle"></use>
        </svg>
      </div>
    </section>
  )
}
