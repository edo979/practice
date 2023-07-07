import { useStore } from '@nanostores/react'
import CartItem from './CartItem'
import { $cart } from '../../store/cart'

const CartList = () => {
  const cart = useStore($cart)

  return (
    <ul className="border-rose-400 border mt-3 space-y-3 overflow-y-auto">
      {cart.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </ul>
  )
}

export default CartList
