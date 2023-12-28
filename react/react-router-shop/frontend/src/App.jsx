import { getFunctions, httpsCallable } from 'firebase/functions'
import { useEffect, useState } from 'react'

const App = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const functions = getFunctions()
      const getProducts = httpsCallable(functions, 'getProducts')

      try {
        const res = await getProducts()
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  const handleSet = async () => {
    const functions = getFunctions()
    const addProduct = httpsCallable(functions, 'addProduct')

    const productData = {
      name: 'second product',
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
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <button onClick={handleSet}>Set</button>
    </div>
  )
}

export default App
