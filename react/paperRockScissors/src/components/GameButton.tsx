type GameButtonProps = {
  buttonType: 'scissors' | 'paper' | 'rock'
}

export default function GameButton({ buttonType }: GameButtonProps) {
  let buttonShadow

  switch (buttonType) {
    case 'scissors':
      buttonShadow = 'yellow-600'
      break
    case 'paper':
      buttonShadow = 'blue-600'
      break
    case 'rock':
      buttonShadow = 'rose-600'
      break

    default:
      buttonShadow = 'yellow-600'
  }
  return (
    <button
      className={`w-32 relative aspect-square flex items-center justify-center rounded-full bg-${buttonType}`}
    >
      <div
        className={`w-full top-1.5 left-0 -z-10 absolute aspect-square rounded-full bg-${buttonShadow}`}
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
