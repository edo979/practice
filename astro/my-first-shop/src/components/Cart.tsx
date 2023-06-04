import { useStore } from '@nanostores/react'
import { $cartItemsTotal } from '../stores/cart'

const Cart = () => {
  const cartItemsTotal = useStore($cartItemsTotal)

  return (
    <div className="indicator">
      <span className="indicator-item indicator-middle indicator-start badge badge-accent text-xs">
        {cartItemsTotal}
      </span>
      <span className="text-2xl">🛒</span>
    </div>
  )
}

export default Cart
