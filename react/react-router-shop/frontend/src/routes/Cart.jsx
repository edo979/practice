import { useLoaderData } from 'react-router-dom'
import { addCartItem } from '../db/cart'

export async function action({ request }) {
  const productId = (await request.formData()).get('productId')
  const data = { productId, quantity: 3 }

  try {
    await addCartItem(data)
  } catch (error) {
    console.log(error)
  }

  return null
}

export async function loader() {
  const items = [{ productId: 'jah', quantity: 3 }]
  return { items }
}

const Cart = () => {
  const { items } = useLoaderData()

  return (
    <div>
      <h1>Cart</h1>
      {items ? <p>There are items in cart</p> : <p>No items in cart yet!</p>}
    </div>
  )
}

export default Cart
