import { useGameData } from '../hooks/GameHook'
import Button from './Button'

export default function Compare() {
  const { userPick, housePick } = useGameData()

  if (!userPick) {
    return null
  }

  return (
    <div className="relative w-72 mx-auto mt-8">
      <div className="absolute left-0 top-0">
        <Button buttonType={userPick} />
      </div>

      {housePick && (
        <div className="absolute right-0 top-0">
          <Button buttonType={housePick} />
        </div>
      )}
    </div>
  )
}
