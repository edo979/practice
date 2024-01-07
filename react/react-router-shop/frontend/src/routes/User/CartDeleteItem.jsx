import { redirect } from 'react-router-dom'
import { deleteCartItem } from '../../db/cart'

export async function action({ request }) {
  const cartItemId = (await request.formData()).get('cartItemId')

  try {
    await deleteCartItem({ cartItemId })
    return redirect('/me/cart')
  } catch (error) {
    throw new Error('Error delete cart item')
  }
}
