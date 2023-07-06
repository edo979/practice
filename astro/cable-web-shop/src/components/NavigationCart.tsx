import { useStore } from '@nanostores/react'
import { $cart, $cartTotalPrice, $totalCartItems } from '../store/cart'

const NavigationCart = () => {
  const cart = useStore($cart)
  const cartTotalPrice = useStore($cartTotalPrice)
  const totalCartItems = useStore($totalCartItems)

  console.log(cart)

  return (
    <span>
      {totalCartItems}-{cartTotalPrice}
    </span>
  )
}

export default NavigationCart
