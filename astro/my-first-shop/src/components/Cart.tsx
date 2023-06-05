import { useState } from 'react'
import { useStore } from '@nanostores/react'
import { $cartItemsTotal } from '../stores/cart'

const Cart = () => {
  const cartItemsTotal = useStore($cartItemsTotal)
  const [isDrawerShow, setIsDrawerShow] = useState(false)

  return (
    <div className="drawer drawer-end w-auto">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked
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
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <label
            htmlFor="my-drawer-4"
            className="ml-auto drawer-button btn btn-outline btn-circle btn-ghost btn-sm font-bold"
          >
            X
          </label>
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Cart
