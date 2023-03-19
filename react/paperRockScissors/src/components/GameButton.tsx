type GameButtonProps = {
  shadowColor: string
  icon: 'scissors' | 'paper' | 'rock'
}

export default function GameButton({ shadowColor, icon }: GameButtonProps) {
  return (
    <button className="w-32 relative aspect-square flex items-center justify-center rounded-full bg-scissors">
      <div
        className={`w-32 top-1.5 left-0 -z-10 absolute aspect-square rounded-full ${shadowColor}`}
      ></div>
      {/* gray shadow */}
      <div className="w-24 aspect-square relative flex items-center justify-center rounded-full overflow-hidden bg-gray-300">
        {/* white background */}
        <div className="w-24 aspect-square absolute top-1.5 left-0 flex items-center justify-center rounded-full bg-white"></div>

        {/* center */}
        <div className="w-24 aspect-square absolute left-0 flex items-center justify-center rounded-full bg-transparent">
          {/* icon */}
          <svg width={50} height={58}>
            <use xlinkHref={`#${icon}`}></use>
          </svg>
        </div>
      </div>
    </button>
  )
}
