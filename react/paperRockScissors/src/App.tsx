import GameButton from './components/GameButton'

function App() {
  return (
    <div className="max-w-xs mx-auto">
      <section className="p-4 mt-8 border-2 border-neutralBlue50 rounded-md">
        <h1 className=" text-3xl text-white font-bold">Hello World</h1>
      </section>

      <section className="mt-8 h-72 w-72 mx-auto relative">
        <div className="absolute top-0 left-0 isolate">
          <GameButton buttonType="paper" />
        </div>

        <div className="absolute top-0 right-0 isolate">
          <GameButton buttonType="scissors" />
        </div>

        <div className="absolute bottom-0 left-20 isolate">
          <GameButton buttonType="rock" />
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-[70%]" viewBox="0 0 313 278">
            <use xlinkHref="#triangle"></use>
          </svg>
        </div>
      </section>
    </div>
  )
}

export default App
