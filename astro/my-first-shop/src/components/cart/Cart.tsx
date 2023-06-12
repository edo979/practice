import { useStore } from '@nanostores/react'
import { $cart, $cartItemsTotal } from '../../stores/cart'
import CartList from './CartList'

const Cart = () => {
  const cartItemsTotal = useStore($cartItemsTotal)
  const cart = useStore($cart)

  return (
    <div className="drawer drawer-end w-auto">
      <input
        id="my-drawer-4"
        type="checkbox"
        checked
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost">
          <div className="indicator isolate">
            <span className="indicator-item indicator-middle indicator-start badge badge-accent text-xs">
              {cartItemsTotal}
            </span>
            <span className="text-2xl">🛒</span>
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <label
            htmlFor="my-drawer-4"
            className="ml-auto drawer-button btn btn-outline btn-circle btn-ghost btn-sm font-bold"
          >
            X
          </label>
          <div className="text-center">
            <span className="text-4xl">🛒</span>
            <p className="text-xl">Your chart</p>
            <hr className="mt-2 border border-base-300" />
          </div>
          <CartList cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default Cart
