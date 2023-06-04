import { useStore } from '@nanostores/react'
import { $cart } from '../stores/cart'

const Cart = () => {
  const cart = useStore($cart)

  return (
    <div className="relative">
      <button className="py-0.5 px-1.5 rounded text-2xl hover:bg-slate-100/50">
        🛒
      </button>
      <span className="px-1 absolute top-1 left-0 rounded bg-rose-500 text-xs">
        {cart.reduce((prev, current) => prev + current.quantity, 0)}
      </span>
    </div>
  )
}

export default Cart
