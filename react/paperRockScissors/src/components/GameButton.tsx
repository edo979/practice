type GameButtonProps = {
  buttonType: 'scissors' | 'paper' | 'rock'
  handleUserPick: (value: string) => void
}

export default function GameButton({
  buttonType,
  handleUserPick,
}: GameButtonProps) {
  return (
    <button
      className={`w-32 relative aspect-square flex items-center justify-center rounded-full bg-${buttonType}`}
      onClick={() => handleUserPick(buttonType)}
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
      <div className="w-24 aspect-square relative flex items-center justify-center rounded-full overflow-hidden bg-gray-300">
        {/* white background */}
        <div className="w-full aspect-square absolute top-1.5 left-0 flex items-center justify-center rounded-full bg-white"></div>

        {/* center */}
        <div className="w-full aspect-square absolute left-0 flex items-center justify-center rounded-full bg-transparent">
          {/* icon */}
          <svg width={50} height={58}>
            <use xlinkHref={`#${buttonType}`}></use>
          </svg>
        </div>
      </div>
    </button>
  )
}
