import GameButton from './components/GameButton'

function App() {
  return (
    <div className="max-w-xs mx-auto">
      <section className="p-4 mt-8 border-2 border-neutralBlue50 rounded-md">
        <h1 className=" text-3xl text-white font-bold">Hello World</h1>
      </section>

      <section className="mt-8 py-8 border">
        <GameButton shadowColor="bg-yellow-700" icon="scissors" />
      </section>
    </div>
  )
}

export default App
