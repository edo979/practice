import { getFunctions, httpsCallable } from 'firebase/functions'

const App = () => {
  const handleSet = async () => {
    const functions = getFunctions()
    const addProduct = httpsCallable(functions, 'addProduct')

    const productData = {
      name: 'third product',
      description: 'Second Description',
    }
    try {
      const result = await addProduct({
        data: productData,
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
