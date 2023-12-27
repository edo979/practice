import { getFunctions, httpsCallable } from 'firebase/functions'

const App = () => {
  const handleSet = async () => {
    const functions = getFunctions()
    const addProduct = httpsCallable(functions, 'addProduct')

    try {
      const result = await addProduct({
        name: 'First product',
        description: 'First Description',
      })
      const data = result.data
      console.log(data)
    } catch (error) {
      console.log(
        'code',
        error.code,
        ' | message',
        error.message,
        '| details',
        error.details
      )
    }
  }

  return (
    <div>
      <button onClick={handleSet}>Set</button>
    </div>
  )
}

export default App
