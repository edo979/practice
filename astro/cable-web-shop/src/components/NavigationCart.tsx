import { useStore } from '@nanostores/react'
import { $cart, $cartTotalPrice } from '../store/cart'

const NavigationCart = () => {
  const cart = useStore($cart)
  const cartTotalPrice = useStore($cartTotalPrice)
  console.log(cart)

  return (
    <span>
      {cart.length}-{cartTotalPrice}
    </span>
  )
}

export default NavigationCart
