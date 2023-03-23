import { ButtonT } from '../hooks/GameHook'

type GameButtonProps = {
  buttonType: ButtonT
  handleUserPick?: (value: ButtonT) => void
}

export default function Button({
  buttonType,
  handleUserPick,
}: GameButtonProps) {
  function handleClick() {
    if (!handleUserPick) return

    handleUserPick(buttonType)
  }

  return (
    <button
      className={`w-32 relative aspect-square flex items-center justify-center rounded-full bg-${buttonType} md:w-44`}
      onClick={handleClick}
    >
      <div
        className={`w-full top-1.5 left-0 absolute -z-20 aspect-square rounded-full ${
          buttonType === 'scissors'
            ? 'bg-yellow-700'
            : buttonType === 'paper'
            ? 'bg-blue-700'
            : 'bg-rose-700'
        }`}
      ></div>

      {/* gray shadow on top */}
      <div className="w-24 aspect-square relative flex items-center justify-center rounded-full overflow-hidden bg-gray-300 md:w-32">
        {/* white background */}
        <div className="w-full aspect-square absolute top-1.5 left-0 flex items-center justify-center rounded-full bg-white"></div>

        {/* center */}
        <div className="w-full aspect-square absolute left-0 flex items-center justify-center rounded-full bg-transparent">
          {/* icon */}
          <svg
            className={`w-[50px] h-[58px] ${
              buttonType === 'rock' ? 'mt-4 md:mt-5' : ''
            } md:scale-125`}
          >
            <use xlinkHref={`#${buttonType}`}></use>
          </svg>
        </div>
      </div>
    </button>
  )
}
