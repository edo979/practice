import { useStore } from '@nanostores/react'
import { $cart } from '../store/cart'

const NavigationCart = () => {
  const cart = useStore($cart)
  console.log(cart)

  return <span>{cart.length}</span>
}

export default NavigationCart
